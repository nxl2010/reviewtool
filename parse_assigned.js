const path = require('path');
const fs = require('fs');
const XLSX = require(path.join(__dirname, 'node_modules', 'xlsx'));

const filePath = 'C:\\Users\\APH\\Downloads\\Danh_sach_san_pham_va_phan_cong_da_them_cac_bo_danh_gia_moi.xlsx';
const rootDir = __dirname;
const publicDir = path.join(rootDir, 'public');

try {
  // Load existing products_assigned.json to preserve real productIDs
  let existingProductMap = {};
  const existingPath = path.join(rootDir, 'products_assigned.json');
  if (fs.existsSync(existingPath)) {
    const existingList = JSON.parse(fs.readFileSync(existingPath, 'utf8'));
    existingList.forEach(p => {
      if (p.stt) existingProductMap[p.stt] = p.productId;
    });
  }

  const workbook = XLSX.readFile(filePath);

  // 1. Parse Phân công sheet
  const phanCongSheet = workbook.Sheets['Phân công'];
  const phanCongData = XLSX.utils.sheet_to_json(phanCongSheet, { header: 1 });
  
  console.log('=== BẢNG PHÂN CÔNG THỰC TẾ (STAFF ASSIGNMENT) ===\n');
  const staffList = [];

  for (let i = 4; i < phanCongData.length; i++) {
    const row = phanCongData[i];
    if (row && row[1]) {
      const staffName = String(row[1]).trim();
      const fromStt = row[2];
      const toStt = row[3];
      const count = row[4];
      staffList.push({ staffName, fromStt, toStt, count });
      console.log(`👤 ${staffName}: Từ STT ${fromStt} -> ${toStt} (${count} sản phẩm)`);
    }
  }

  // 2. Parse Tất cả câu đánh giá sheet for evaluation text sets
  const evalSheet = workbook.Sheets['Tất cả câu đánh giá'];
  const evalData = XLSX.utils.sheet_to_json(evalSheet, { header: 1 });
  const evalMap = {};

  for (let i = 4; i < evalData.length; i++) {
    const row = evalData[i];
    if (row && typeof row[0] === 'number') {
      const stt = row[0];
      evalMap[stt] = {
        md1: row[3] ? String(row[3]).trim() : '',
        md2: row[4] ? String(row[4]).trim() : '',
        txt1_short: row[5] ? String(row[5]).trim() : '',
        txt1_long: row[6] ? String(row[6]).trim() : '',
        txt1_compare: row[7] ? String(row[7]).trim() : '',
        txt2_short: row[8] ? String(row[8]).trim() : '',
        txt2_long: row[9] ? String(row[9]).trim() : '',
        txt2_compare: row[10] ? String(row[10]).trim() : '',
        new_short2: row[11] ? String(row[11]).trim() : '',
        new_long2: row[12] ? String(row[12]).trim() : '',
        new_compare2: row[13] ? String(row[13]).trim() : '',
        new_mix3: row[14] ? String(row[14]).trim() : ''
      };
    }
  }

  // 3. Parse Products
  const prodSheet = workbook.Sheets['Danh sách sản phẩm'];
  const prodData = XLSX.utils.sheet_to_json(prodSheet, { header: 1 });
  const productsWithAssignee = [];

  for (let i = 4; i < prodData.length; i++) {
    const row = prodData[i];
    if (row && typeof row[0] === 'number' && row[2]) {
      const stt = row[0];
      const evals = evalMap[stt] || {};

      // Mẫu mặc định backwards compatibility: ưu tiên new_short2 / txt2_short, new_long2 / txt2_long
      const template1 = evals.new_short2 || evals.txt2_short || evals.txt1_short || evals.md1 || '';
      const template2 = evals.new_long2 || evals.txt2_long || evals.txt1_long || evals.md2 || '';
      const template3 = evals.new_compare2 || evals.txt2_compare || evals.txt1_compare || '';

      productsWithAssignee.push({
        stt: stt,
        category: row[1] ? String(row[1]).trim() : '',
        name: String(row[2]).trim(),
        sku: row[3] ? String(row[3]).trim() : '',
        price: typeof row[4] === 'number' ? row[4] : 0,
        status: row[5] ? String(row[5]).trim() : '',
        url: row[6] ? String(row[6]).trim() : '',
        assignee: row[7] ? String(row[7]).trim() : (row[8] ? String(row[8]).trim() : 'Chưa phân công'),
        productId: existingProductMap[stt] || (stt === 4 ? '9778' : String(10410 + stt)),
        template1: template1,
        template2: template2,
        template3: template3,
        reviews: {
          md1: evals.md1 || '',
          md2: evals.md2 || '',
          txt1_short: evals.txt1_short || '',
          txt1_long: evals.txt1_long || '',
          txt1_compare: evals.txt1_compare || '',
          txt2_short: evals.txt2_short || '',
          txt2_long: evals.txt2_long || '',
          txt2_compare: evals.txt2_compare || '',
          new_short2: evals.new_short2 || '',
          new_long2: evals.new_long2 || '',
          new_compare2: evals.new_compare2 || '',
          new_mix3: evals.new_mix3 || ''
        }
      });
    }
  }

  console.log(`\n=> Tổng số sản phẩm phân công: ${productsWithAssignee.length}`);

  // Write JSON
  fs.writeFileSync(path.join(rootDir, 'products_assigned.json'), JSON.stringify(productsWithAssignee, null, 2));
  fs.writeFileSync(path.join(publicDir, 'products_assigned.json'), JSON.stringify(productsWithAssignee, null, 2));
  fs.writeFileSync(path.join(rootDir, 'products.json'), JSON.stringify(productsWithAssignee, null, 2));
  fs.writeFileSync(path.join(publicDir, 'products.json'), JSON.stringify(productsWithAssignee, null, 2));
  fs.writeFileSync(path.join(rootDir, 'staff_list.json'), JSON.stringify(staffList, null, 2));
  fs.writeFileSync(path.join(publicDir, 'staff_list.json'), JSON.stringify(staffList, null, 2));

  console.log('✅ Đã xuất file `products_assigned.json`, `products.json`, và `staff_list.json` thành công!');
} catch (e) {
  console.error('Lỗi đọc file Excel:', e);
}

