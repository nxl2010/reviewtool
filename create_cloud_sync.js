const https = require('https');
const fs = require('fs');
const path = require('path');

const rootDir = 'd:\\evaluate\\kuchen-review-tool';
const products = JSON.parse(fs.readFileSync(path.join(rootDir, 'products_assigned.json'), 'utf8'));

// Initial status for 128 products
const initialData = {};
products.forEach(p => {
  const pid = p.productId || (p.stt === 4 ? 9778 : p.stt);
  initialData[pid] = {
    stt: p.stt,
    productId: pid,
    name: p.name,
    url: p.url,
    assignee: p.assignee,
    status: 'CHƯA ĐÁNH GIÁ',
    reviewContent: 'Chưa có đánh giá',
    reviewerName: '-',
    reviewerPhone: '-',
    rating: 0,
    completedAt: '-'
  };
});

// Step 1: Create new keyvalue token
https.get('https://api.keyvalue.xyz/new/kuchen_db_token', (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    // Extract token URL e.g. https://api.keyvalue.xyz/xxxx/kuchen_db_token
    const tokenMatch = body.trim().match(/keyvalue\.xyz\/([a-f0-9]+)/i);
    const token = tokenMatch ? tokenMatch[1] : 'kuchen_global_token_2026';
    
    console.log('🎉 Created Global KeyValue Token:', token);

    // Save token config
    const config = { token: token, fullUrl: `https://api.keyvalue.xyz/${token}/kuchen_status` };
    fs.writeFileSync(path.join(rootDir, 'cloud_config.json'), JSON.stringify(config, null, 2));
    fs.writeFileSync(path.join(rootDir, 'public', 'cloud_config.json'), JSON.stringify(config, null, 2));
  });
}).on('error', (e) => {
  console.error('Error creating token:', e.message);
});
