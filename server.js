const express = require('express');
const cors = require('cors');
const https = require('https');
const http = require('http');
const querystring = require('querystring');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Helper: Make HTTP/HTTPS request
function requestUrl(targetUrl, options = {}) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(targetUrl);
    const client = parsedUrl.protocol === 'https:' ? https : http;
    
    const reqOptions = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),
      path: parsedUrl.pathname + parsedUrl.search,
      method: options.method || 'GET',
      headers: options.headers || {}
    };

    const req = client.request(reqOptions, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });

    req.on('error', err => reject(err));

    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
}

// Extract Product ID and Name from Kuchen product URL
app.post('/api/extract-info', async (req, res) => {
  try {
    let { url } = req.body;
    if (!url) {
      return res.status(400).json({ success: false, error: 'Vui lòng cung cấp URL sản phẩm' });
    }

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    const response = await requestUrl(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    const html = response.body;

    // Match comment_post_ID
    const postIdMatch = html.match(/name=['"]comment_post_ID['"]\s+value=['"](\d+)['"]/i) ||
                        html.match(/value=['"](\d+)['"]\s+name=['"]comment_post_ID['"]/i) ||
                        html.match(/name=['"]post_ID['"]\s+value=['"](\d+)['"]/i);
    
    // Match Title
    const titleMatch = html.match(/<h1[^>]*class="[^"]*product-title[^"]*"[^>]*>([\s\S]*?)<\/h1>/i) ||
                       html.match(/<title>([\s\S]*?)<\/title>/i);

    const productId = postIdMatch ? postIdMatch[1] : null;
    let title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : 'Sản phẩm Kuchen';

    if (!productId) {
      return res.status(404).json({
        success: false,
        error: 'Không tìm thấy ID sản phẩm (comment_post_ID) trong trang. Vui lòng kiểm tra lại URL.'
      });
    }

    return res.json({
      success: true,
      data: {
        productId,
        title,
        url
      }
    });
  } catch (err) {
    console.error('Extract error:', err);
    return res.status(500).json({ success: false, error: 'Không thể kết nối đến trang sản phẩm: ' + err.message });
  }
});

// Post a single review
async function submitSingleReview({ productId, productUrl, author, phone, email, rating, comment }) {
  const postData = querystring.stringify({
    comment: comment || '',
    rating: String(rating || '5'),
    author: author || '',
    phone: phone || '',
    email: email || '',
    comment_post_ID: String(productId),
    comment_parent: '0',
    submit: 'Gửi đánh giá ngay'
  });

  const referer = productUrl || `https://kuchen.vn/san-pham/?p=${productId}`;

  const response = await requestUrl('https://kuchen.vn/wp-comments-post.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData),
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Referer': referer,
      'Origin': 'https://kuchen.vn'
    },
    body: postData
  });

  // Success in WP/WooCommerce is usually HTTP 302 Redirect to #reviews or product page
  if (response.statusCode === 302 || response.statusCode === 200) {
    const location = response.headers.location || '';
    if (location.includes('unapproved') || location.includes('#reviews') || response.statusCode === 302) {
      return {
        success: true,
        statusCode: response.statusCode,
        location,
        message: 'Gửi đánh giá thành công! Đã chuyển hướng hệ thống WooCommerce.'
      };
    }
  }

  // If error HTML returned
  let errorText = 'Không xác định';
  if (response.body) {
    const cleanBody = response.body.replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<script[\s\S]*?<\/script>/gi, '');
    const pMatch = cleanBody.match(/<p>([\s\S]*?)<\/p>/i);
    if (pMatch) {
      errorText = pMatch[1].replace(/<[^>]+>/g, '').trim();
    } else {
      errorText = cleanBody.replace(/<[^>]+>/g, '').substring(0, 200).trim();
    }
  }

  return {
    success: false,
    statusCode: response.statusCode,
    error: errorText
  };
}

// Single Review API endpoint
app.post('/api/submit-review', async (req, res) => {
  try {
    const { productId, productUrl, author, phone, email, rating, comment } = req.body;

    if (!productId || !author || !phone || !comment) {
      return res.status(400).json({
        success: false,
        error: 'Thiếu thông tin bắt buộc (ID sản phẩm, Họ tên, SĐT, Nội dung đánh giá)'
      });
    }

    if (comment.trim().length < 10) {
      return res.status(400).json({
        success: false,
        error: 'Nội dung đánh giá phải có tối thiểu 10 ký tự'
      });
    }

    const result = await submitSingleReview({ productId, productUrl, author, phone, email, rating, comment });
    return res.json(result);
  } catch (err) {
    console.error('Submit review error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// SSE Batch Review Submission Endpoint
app.get('/api/batch-stream', async (req, res) => {
  const dataParam = req.query.data;
  if (!dataParam) {
    return res.status(400).send('Missing data');
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  let payload;
  try {
    payload = JSON.parse(decodeURIComponent(dataParam));
  } catch (e) {
    res.write(`data: ${JSON.stringify({ type: 'error', message: 'Dữ liệu không hợp lệ' })}\n\n`);
    return res.end();
  }

  const { productId, productUrl, reviews, minDelay = 3, maxDelay = 8 } = payload;

  if (!reviews || !Array.isArray(reviews) || reviews.length === 0) {
    res.write(`data: ${JSON.stringify({ type: 'error', message: 'Danh sách đánh giá rỗng' })}\n\n`);
    return res.end();
  }

  res.write(`data: ${JSON.stringify({ type: 'start', total: reviews.length })}\n\n`);

  for (let i = 0; i < reviews.length; i++) {
    const item = reviews[i];
    
    // Progress notification
    res.write(`data: ${JSON.stringify({
      type: 'submitting',
      index: i + 1,
      total: reviews.length,
      item
    })}\n\n`);

    try {
      const result = await submitSingleReview({
        productId,
        productUrl,
        author: item.author,
        phone: item.phone,
        email: item.email || '',
        rating: item.rating || 5,
        comment: item.comment
      });

      res.write(`data: ${JSON.stringify({
        type: 'item_result',
        index: i + 1,
        total: reviews.length,
        item,
        result
      })}\n\n`);
    } catch (err) {
      res.write(`data: ${JSON.stringify({
        type: 'item_result',
        index: i + 1,
        total: reviews.length,
        item,
        result: { success: false, error: err.message }
      })}\n\n`);
    }

    // Delay before next request (except for the last one)
    if (i < reviews.length - 1) {
      const delaySeconds = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
      res.write(`data: ${JSON.stringify({
        type: 'delay',
        seconds: delaySeconds
      })}\n\n`);
      await new Promise(r => setTimeout(r, delaySeconds * 1000));
    }
  }

  res.write(`data: ${JSON.stringify({ type: 'complete' })}\n\n`);
  res.end();
});

app.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(` Kuchen Review Tool Server is running on:`);
  console.log(` http://localhost:${PORT}`);
  console.log(`===================================================`);
});
