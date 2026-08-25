const path = require('path');
const fs = require('fs');
const XLSX = require(path.join(__dirname, 'node_modules', 'xlsx'));

const filePath = 'C:\\Users\\APH\\Downloads\\Danh_sach_san_pham_KUCHEN_2026-08-25.xlsx';

try {
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets['Danh sách sản phẩm'];
  const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  const categoriesMap = {};

  for (let i = 2; i < rawData.length; i++) {
    const row = rawData[i];
    if (row && typeof row[0] === 'number' && row[2]) {
      const cat = (row[1] || 'Khác').trim();
      if (!categoriesMap[cat]) {
        categoriesMap[cat] = [];
      }
      categoriesMap[cat].push({
        STT: categoriesMap[cat].length + 1,
        'Tên sản phẩm': row[2],
        'Model / SKU': row[3] || '',
        'Giá niêm yết (VND)': row[4] ? Number(row[4]).toLocaleString('vi-VN') + ' đ' : 'Chưa cập nhật',
        'Trạng thái': row[5] || 'Đang bán',
        'Đường link sản phẩm': row[6] || ''
      });
    }
  }

  console.log('=== TỔNG HỢP DANH MỤC THUỘC CÁC BỘ PHẬN ===\n');
  let totalAll = 0;
  for (const [catName, list] of Object.entries(categoriesMap)) {
    console.log(`📌 Bộ phận / Danh mục: ${catName} (${list.length} sản phẩm)`);
    totalAll += list.length;
  }
  console.log(`\n=> Tổng cộng: ${totalAll} sản phẩm trong 128 mã sản phẩm Kuchen.\n`);

  // Create a new Excel workbook split into separate Sheets for each department/category
  const newWb = XLSX.utils.book_new();

  // 1. Summary sheet
  const summaryData = Object.entries(categoriesMap).map(([cat, list], idx) => ({
    'STT': idx + 1,
    'Bộ phận / Danh mục': cat,
    'Số lượng sản phẩm': list.length
  }));
  const summaryWs = XLSX.utils.json_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(newWb, summaryWs, 'Tổng hợp bộ phận');

  // 2. Individual sheets for each department
  for (const [catName, list] of Object.entries(categoriesMap)) {
    // Sanitize sheet name (max 31 chars, no invalid chars)
    let safeSheetName = catName.replace(/[\\/?*\[\]]/g, '').substring(0, 30);
    const ws = XLSX.utils.json_to_sheet(list);
    
    // Set column widths
    ws['!cols'] = [
      { wch: 6 },
      { wch: 45 },
      { wch: 18 },
      { wch: 20 },
      { wch: 15 },
      { wch: 60 }
    ];

    XLSX.utils.book_append_sheet(newWb, ws, safeSheetName);
  }

  // Save new Excel file
  const outputPath = 'C:\\Users\\APH\\Downloads\\Danh_sach_san_pham_KUCHEN_Theo_Bo_Phan.xlsx';
  XLSX.writeFile(newWb, outputPath);
  console.log(`✅ Đã tạo file Excel chia theo từng bộ phận tại: ${outputPath}`);

  // Save JSON for report
  fs.writeFileSync(path.join(__dirname, 'categories_split.json'), JSON.stringify(categoriesMap, null, 2));

} catch (err) {
  console.error('Lỗi xử lý file Excel:', err);
}
