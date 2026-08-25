const https = require('https');
const http = require('http');
const querystring = require('querystring');

// Simple CLI tool to submit a review directly from command line
// Usage: node cli.js --url "https://kuchen.vn/san-pham/noi-com-thong-minh-ku-rcdp3003/" --author "Nguyễn Thị Hương" --phone "0912345678" --rating 5 --comment "Nồi cơm điện Kuchen dùng rất êm, cơm chín đều ngon dẻo."

function parseArgs() {
  const args = process.argv.slice(2);
  const params = {
    url: 'https://kuchen.vn/san-pham/noi-com-thong-minh-ku-rcdp3003/',
    author: 'Nguyễn Văn Nam',
    phone: '0909123456',
    email: 'nam.nguyen@gmail.com',
    rating: '5',
    comment: 'Nồi cơm điện KUCHEN KU RCDP3003 thông minh nấu cơm rất ngon, giữ ấm tốt và thiết kế sang trọng.'
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--url' && args[i + 1]) params.url = args[++i];
    if (args[i] === '--author' && args[i + 1]) params.author = args[++i];
    if (args[i] === '--phone' && args[i + 1]) params.phone = args[++i];
    if (args[i] === '--email' && args[i + 1]) params.email = args[++i];
    if (args[i] === '--rating' && args[i + 1]) params.rating = args[++i];
    if (args[i] === '--comment' && args[i + 1]) params.comment = args[++i];
    if (args[i] === '--id' && args[i + 1]) params.productId = args[++i];
  }
  return params;
}

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function runCLI() {
  const params = parseArgs();
  console.log('\n🚀 [Kuchen Review CLI Tool]');
  console.log(`📌 Sản phẩm: ${params.url}`);

  let productId = params.productId;
  if (!productId) {
    console.log('🔍 Đang lấy ID sản phẩm từ URL...');
    try {
      const html = await fetchPage(params.url);
      const match = html.match(/name=['"]comment_post_ID['"]\s+value=['"](\d+)['"]/i) ||
                    html.match(/value=['"](\d+)['"]\s+name=['"]comment_post_ID['"]/i);
      if (match) {
        productId = match[1];
        console.log(`✅ Tìm thấy Product ID: ${productId}`);
      } else {
        console.error('❌ Không tìm thấy Product ID từ trang web.');
        process.exit(1);
      }
    } catch (e) {
      console.error('❌ Lỗi tải trang sản phẩm:', e.message);
      process.exit(1);
    }
  }

  console.log('\n📝 Thông tin đánh giá gửi đi:');
  console.log(` - Người gửi: ${params.author} (${params.phone})`);
  console.log(` - Email: ${params.email}`);
  console.log(` - Đánh giá: ${params.rating} ⭐`);
  console.log(` - Nội dung: "${params.comment}"`);
  console.log('\n⏳ Đang gửi đánh giá tới kuchen.vn...');

  const postData = querystring.stringify({
    comment: params.comment,
    rating: String(params.rating),
    author: params.author,
    phone: params.phone,
    email: params.email,
    comment_post_ID: String(productId),
    comment_parent: '0',
    submit: 'Gửi đánh giá ngay'
  });

  const req = https.request({
    hostname: 'kuchen.vn',
    port: 443,
    path: '/wp-comments-post.php',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData),
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Referer': params.url,
      'Origin': 'https://kuchen.vn'
    }
  }, res => {
    console.log(`\n📡 Phản hồi từ server HTTP Status: ${res.statusCode}`);
    if (res.statusCode === 302) {
      console.log('🎉 THÀNH CÔNG: Đánh giá đã được gửi đi thành công!');
      console.log(`🔗 Location: ${res.headers.location || 'N/A'}`);
    } else {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        console.log('⚠️ Phản hồi:', body.substring(0, 300));
      });
    }
  });

  req.on('error', e => console.error('❌ Lỗi kết nối:', e.message));
  req.write(postData);
  req.end();
}

runCLI();
