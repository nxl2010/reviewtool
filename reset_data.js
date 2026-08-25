const fs = require('fs');
const path = require('path');

const rootDir = 'd:\\evaluate\\kuchen-review-tool';
const products = JSON.parse(fs.readFileSync(path.join(rootDir, 'products_assigned.json'), 'utf8'));

// Generate clean pending status for all 128 products
const resetStatusData = products.map(p => ({
  stt: p.stt,
  category: p.category,
  name: p.name,
  sku: p.sku,
  price: p.price,
  url: p.url,
  assignee: p.assignee,
  status: 'CHƯA ĐÁNH GIÁ',
  statusClass: 'pending',
  reviewContent: 'Chưa có đánh giá',
  reviewerName: '-',
  reviewerPhone: '-',
  rating: 0,
  completedAt: '-'
}));

fs.writeFileSync(path.join(rootDir, 'completion_status.json'), JSON.stringify(resetStatusData, null, 2));
fs.writeFileSync(path.join(rootDir, 'public', 'completion_status.json'), JSON.stringify(resetStatusData, null, 2));

// Delete test auto review runner script
const autoScriptPath = path.join(rootDir, 'run_auto_reviews.js');
if (fs.existsSync(autoScriptPath)) {
  fs.unlinkSync(autoScriptPath);
  console.log('Deleted run_auto_reviews.js test script!');
}

console.log('Successfully reset completion_status.json to 0% completed for all 128 products!');
