const fs = require('fs');
const path = require('path');
const https = require('https');

const rootDir = 'd:\\evaluate\\kuchen-review-tool';
const products = JSON.parse(fs.readFileSync(path.join(rootDir, 'products_assigned.json'), 'utf8'));

function fetchRealProductId(url) {
  return new Promise((resolve) => {
    if (!url || !url.startsWith('http')) {
      return resolve(null);
    }

    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (res) => {
      let html = '';
      res.on('data', chunk => html += chunk);
      res.on('end', () => {
        const match = html.match(/name=['"]comment_post_ID['"]\s+value=['"](\d+)['"]/i) ||
                      html.match(/value=['"](\d+)['"]\s+name=['"]comment_post_ID['"]/i) ||
                      html.match(/name=['"]post_ID['"]\s+value=['"](\d+)['"]/i) ||
                      html.match(/product\/(\d+)/i);
        if (match) {
          resolve(match[1]);
        } else {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

async function updateAllProductIds() {
  console.log(`🔍 Đang trích xuất Product ID thật từ website Kuchen.vn cho ${products.length} sản phẩm...`);

  let foundCount = 0;
  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    console.log(`[${i + 1}/${products.length}] Lấy ID thật cho: "${p.name}" (${p.url})...`);
    
    const realId = await fetchRealProductId(p.url);
    if (realId) {
      p.productId = realId;
      foundCount++;
      console.log(`   ✅ Real Product ID: ${realId}`);
    } else {
      p.productId = p.stt === 4 ? '9778' : null;
      console.log(`   ⚠️ Không tìm thấy ID, giữ nguyên hoặc mặc định.`);
    }

    // Small delay to avoid overloading kuchen.vn
    await new Promise(r => setTimeout(r, 150));
  }

  console.log(`\n🎉 Đã hoàn thành trích xuất ${foundCount}/${products.length} Product ID thật từ Kuchen.vn!`);

  // Write updated products_assigned.json & products.json
  fs.writeFileSync(path.join(rootDir, 'products_assigned.json'), JSON.stringify(products, null, 2));
  fs.writeFileSync(path.join(rootDir, 'public', 'products_assigned.json'), JSON.stringify(products, null, 2));
  fs.writeFileSync(path.join(rootDir, 'products.json'), JSON.stringify(products, null, 2));
  fs.writeFileSync(path.join(rootDir, 'public', 'products.json'), JSON.stringify(products, null, 2));

  // Also update completion_status.json
  const statusData = JSON.parse(fs.readFileSync(path.join(rootDir, 'completion_status.json'), 'utf8'));
  statusData.forEach((s, idx) => {
    s.productId = products[idx] ? products[idx].productId : null;
  });
  fs.writeFileSync(path.join(rootDir, 'completion_status.json'), JSON.stringify(statusData, null, 2));
  fs.writeFileSync(path.join(rootDir, 'public', 'completion_status.json'), JSON.stringify(statusData, null, 2));
}

updateAllProductIds();
