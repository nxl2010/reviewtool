const path = require('path');
const fs = require('fs');
const XLSX = require(path.join(__dirname, 'node_modules', 'xlsx'));

const filePath = 'C:\\Users\\APH\\Downloads\\Danh_sach_san_pham_KUCHEN_2026-08-25 (1).xlsx';

try {
  const workbook = XLSX.readFile(filePath);

  // Parse Phân công sheet
  const phanCongSheet = workbook.Sheets['Phân công'];
  const phanCongData = XLSX.utils.sheet_to_json(phanCongSheet, { header: 1 });
  
  console.log('=== BẢNG PHÂN CÔNG THỰC TẾ (STAFF ASSIGNMENT) ===\n');
  const staffList = [];

  for (let i = 4; i < phanCongData.length; i++) {
    const row = phanCongData[i];
    if (row && row[1]) {
      const staffName = row[1].trim();
      const fromStt = row[2];
      const toStt = row[3];
      const count = row[4];
      staffList.push({ staffName, fromStt, toStt, count });
      console.log(`👤 ${staffName}: Từ STT ${fromStt} -> ${toStt} (${count} sản phẩm)`);
    }
  }

  // Parse Products
  const prodSheet = workbook.Sheets['Danh sách sản phẩm'];
  const prodData = XLSX.utils.sheet_to_json(prodSheet, { header: 1 });
  const productsWithAssignee = [];

  for (let i = 4; i < prodData.length; i++) {
    const row = prodData[i];
    if (row && typeof row[0] === 'number' && row[2]) {
      productsWithAssignee.push({
        stt: row[0],
        category: row[1] || '',
        name: row[2],
        sku: row[3] || '',
        price: row[4] || 0,
        status: row[5] || '',
        url: row[6] || '',
        assignee: row[8] || 'Chưa phân công'
      });
    }
  }

  console.log(`\n=> Tổng số sản phẩm phân công: ${productsWithAssignee.length}`);

  // Write JSON
  fs.writeFileSync(path.join(__dirname, 'products_assigned.json'), JSON.stringify(productsWithAssignee, null, 2));
  fs.writeFileSync(path.join(__dirname, 'public', 'products_assigned.json'), JSON.stringify(productsWithAssignee, null, 2));
  fs.writeFileSync(path.join(__dirname, 'staff_list.json'), JSON.stringify(staffList, null, 2));
  fs.writeFileSync(path.join(__dirname, 'public', 'staff_list.json'), JSON.stringify(staffList, null, 2));

  console.log('✅ Đã xuất file `products_assigned.json` và `staff_list.json` thành công!');
} catch (e) {
  console.error('Lỗi đọc file Excel:', e);
}
