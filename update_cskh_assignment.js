const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const rootDir = 'd:\\evaluate\\kuchen-review-tool';
const publicDir = path.join(rootDir, 'public');

const excelPath = 'C:\\Users\\APH\\Downloads\\Danh_sach_san_pham_va_phan_cong.xlsx';
const wb = xlsx.readFile(excelPath);

// 1. Parse Staff List from sheet 'Phân công'
const phanCongSheet = wb.Sheets['Phân công'];
const phanCongRaw = xlsx.utils.sheet_to_json(phanCongSheet, { header: 1 });

const newStaffList = [];
for (let i = 4; i < phanCongRaw.length; i++) {
  const r = phanCongRaw[i];
  if (r && r[0] && typeof r[0] === 'number' && r[1]) {
    newStaffList.push({
      staffName: String(r[1]).trim(),
      fromStt: r[2],
      toStt: r[3],
      count: r[4]
    });
  }
}

console.log('--- New CSKH Staff List ---', newStaffList);

// 2. Parse Products from sheet 'Danh sách sản phẩm'
const pSheet = wb.Sheets['Danh sách sản phẩm'];
const pRaw = xlsx.utils.sheet_to_json(pSheet, { header: 1 });

const existingProducts = JSON.parse(fs.readFileSync(path.join(rootDir, 'products_assigned.json'), 'utf8'));

// Build assignee map by STT
const assigneeMap = {};
for (let i = 4; i < pRaw.length; i++) {
  const r = pRaw[i];
  if (r && r[0] && typeof r[0] === 'number') {
    assigneeMap[r[0]] = r[7] ? String(r[7]).trim() : '';
  }
}

existingProducts.forEach(p => {
  if (assigneeMap[p.stt]) {
    p.assignee = assigneeMap[p.stt];
  }
});

console.log('Sample Product 1:', existingProducts[0]);
console.log('Sample Product 20:', existingProducts[19]);

// 3. Update completion_status.json
const statusData = existingProducts.map(p => ({
  stt: p.stt,
  productId: p.productId || (p.stt === 4 ? 9778 : p.stt),
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

// Save to root and public
fs.writeFileSync(path.join(rootDir, 'staff_list.json'), JSON.stringify(newStaffList, null, 2));
fs.writeFileSync(path.join(publicDir, 'staff_list.json'), JSON.stringify(newStaffList, null, 2));

fs.writeFileSync(path.join(rootDir, 'products_assigned.json'), JSON.stringify(existingProducts, null, 2));
fs.writeFileSync(path.join(rootDir, 'products.json'), JSON.stringify(existingProducts, null, 2));
fs.writeFileSync(path.join(publicDir, 'products_assigned.json'), JSON.stringify(existingProducts, null, 2));
fs.writeFileSync(path.join(publicDir, 'products.json'), JSON.stringify(existingProducts, null, 2));

fs.writeFileSync(path.join(rootDir, 'completion_status.json'), JSON.stringify(statusData, null, 2));
fs.writeFileSync(path.join(publicDir, 'completion_status.json'), JSON.stringify(statusData, null, 2));

console.log('🎉 Successfully updated CSKH Staff & Product Assignment datasets!');
