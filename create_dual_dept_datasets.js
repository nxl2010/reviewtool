const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const rootDir = 'd:\\evaluate\\kuchen-review-tool';
const publicDir = path.join(rootDir, 'public');

// 1. CSKH Staff List (7 members)
const staffCSKH = [
  { staffName: 'Cao Hương', fromStt: 1, toStt: 19, count: 19 },
  { staffName: 'Quỳnh Hương', fromStt: 20, toStt: 38, count: 19 },
  { staffName: 'Quỳnh Như', fromStt: 39, toStt: 56, count: 18 },
  { staffName: 'Thu Trang', fromStt: 57, toStt: 74, count: 18 },
  { staffName: 'Thị Thu', fromStt: 75, toStt: 92, count: 18 },
  { staffName: 'Lan Anh', fromStt: 93, toStt: 110, count: 18 },
  { staffName: 'Nguyễn Quỳnh', fromStt: 111, toStt: 128, count: 18 }
];

// 2. Kỹ Thuật Staff List (13 members)
const staffKyThuat = [
  { staffName: 'Chí Sơn', fromStt: 1, toStt: 10, count: 10 },
  { staffName: 'Huỳnh Sơn', fromStt: 11, toStt: 20, count: 10 },
  { staffName: 'Nguyễn Dũng', fromStt: 21, toStt: 30, count: 10 },
  { staffName: 'Như Vinh', fromStt: 31, toStt: 40, count: 10 },
  { staffName: 'Tâm HCM', fromStt: 41, toStt: 50, count: 10 },
  { staffName: 'Thị Hà Nội', fromStt: 51, toStt: 60, count: 10 },
  { staffName: 'Nguyễn Xuân Tú', fromStt: 61, toStt: 70, count: 10 },
  { staffName: 'Phạm Quang Điệp', fromStt: 71, toStt: 80, count: 10 },
  { staffName: 'Hoàng Văn Tiến', fromStt: 81, toStt: 90, count: 10 },
  { staffName: 'Chu Xuân Thành', fromStt: 91, toStt: 100, count: 10 },
  { staffName: 'Lê Thanh Phong', fromStt: 101, toStt: 110, count: 10 },
  { staffName: 'Hoàng Tùng', fromStt: 111, toStt: 119, count: 9 },
  { staffName: 'Nguyễn Xuân Lâm', fromStt: 120, toStt: 128, count: 9 }
];

// Read master products file
const productsMaster = JSON.parse(fs.readFileSync(path.join(rootDir, 'products_assigned.json'), 'utf8'));

// Build CSKH products dataset
const productsCSKH = productsMaster.map(p => {
  const foundStaff = staffCSKH.find(s => p.stt >= s.fromStt && p.stt <= s.toStt);
  return {
    ...p,
    assignee: foundStaff ? foundStaff.staffName : p.assignee
  };
});

// Build Kỹ Thuật products dataset
const productsKyThuat = productsMaster.map(p => {
  const foundStaff = staffKyThuat.find(s => p.stt >= s.fromStt && p.stt <= s.toStt);
  return {
    ...p,
    assignee: foundStaff ? foundStaff.staffName : p.assignee
  };
});

console.log('CSKH Product 1:', productsCSKH[0].name, '->', productsCSKH[0].assignee);
console.log('Kỹ Thuật Product 1:', productsKyThuat[0].name, '->', productsKyThuat[0].assignee);

// Save both department JSON datasets
fs.writeFileSync(path.join(rootDir, 'staff_cskh.json'), JSON.stringify(staffCSKH, null, 2));
fs.writeFileSync(path.join(publicDir, 'staff_cskh.json'), JSON.stringify(staffCSKH, null, 2));

fs.writeFileSync(path.join(rootDir, 'staff_kythuat.json'), JSON.stringify(staffKyThuat, null, 2));
fs.writeFileSync(path.join(publicDir, 'staff_kythuat.json'), JSON.stringify(staffKyThuat, null, 2));

fs.writeFileSync(path.join(rootDir, 'products_cskh.json'), JSON.stringify(productsCSKH, null, 2));
fs.writeFileSync(path.join(publicDir, 'products_cskh.json'), JSON.stringify(productsCSKH, null, 2));

fs.writeFileSync(path.join(rootDir, 'products_kythuat.json'), JSON.stringify(productsKyThuat, null, 2));
fs.writeFileSync(path.join(publicDir, 'products_kythuat.json'), JSON.stringify(productsKyThuat, null, 2));

console.log('🎉 Successfully created Dual Department Datasets (CSKH & Kỹ Thuật)!');
