// Embedded products extracted from Danh_sach_san_pham_KUCHEN_2026-08-25.xlsx
const embeddedProducts = [
  {
    "stt": 1,
    "category": "Dụng cụ nấu ăn, nồi chảo",
    "name": "Bộ 10 đôi đũa inox 316 Molybdenum KU SKC041",
    "sku": "KU SKC041",
    "price": 499000,
    "url": "https://kuchen.vn/san-pham/bo-10-doi-dua-inox-316-molybdenum-kuchen-skc041/"
  },
  {
    "stt": 2,
    "category": "Dụng cụ nấu ăn, nồi chảo",
    "name": "Bộ 4 thớt nhựa cao cấp KÜCHEN (FDA) KU CB4025",
    "sku": "KU CB4025",
    "price": 1290000,
    "url": "https://kuchen.vn/san-pham/bo-4-thot-nhua-cao-cap-kuchen-fda-ku-cb4025/"
  },
  {
    "stt": 3,
    "category": "Dụng cụ nấu ăn, nồi chảo",
    "name": "Máy xay tiêu-muối tự động KUCHEN KYMQ-63B",
    "sku": "KYMQ-63B",
    "price": 450000,
    "url": "https://kuchen.vn/san-pham/may-xay-tieu-dien-trong-luc-kuchen-ku-kymq-63b/"
  },
  {
    "stt": 4,
    "category": "Dụng cụ nấu ăn, nồi chảo",
    "name": "Nồi cơm điện KUCHEN KU RCDP3003 (Sản phẩm tiêu biểu)",
    "sku": "KU RCDP3003",
    "price": 3990000,
    "url": "https://kuchen.vn/san-pham/noi-com-thong-minh-ku-rcdp3003/"
  }
];

// Data pools for generating rich Vietnamese names (Họ + Tên đệm + Tên)
const hoList = [
  "Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Huỳnh", "Vũ", "Võ", "Đặng", "Bùi", 
  "Đỗ", "Hồ", "Ngô", "Dương", "Lý", "Phan", "Trịnh", "Đào", "Đinh", "Lâm", 
  "Phùng", "Mai", "Cao", "Lương", "Trương", "Tạ", "Khương", "Tô", "Quách", "Thái",
  "Nghiêm", "Văn", "Đinh Lê", "Nguyễn Hoàng", "Trần Đăng", "Lê Vũ", "Phạm Hoàng", "Vũ Ngọc"
];

const tenDemNam = [
  "Văn", "Đức", "Quốc", "Đình", "Minh", "Hoàng", "Hữu", "Tấn", "Trọng", "Công", 
  "Tuấn", "Viết", "Thái", "Phúc", "Xuân", "Chí", "Thành", "Bảo", "Gia", "Duy", 
  "Quang", "Ngọc", "Nhật", "Tiến", "Hải", "Khánh", "Anh", "Đăng", "Thế", "Thành"
];

const tenNam = [
  "Hùng", "Dũng", "Cường", "Tuấn", "Minh", "Hoàng", "Nam", "Đức", "Huy", "Hải", 
  "Phong", "Sơn", "Thành", "Phúc", "Việt", "An", "Trí", "Lâm", "Trung", "Hiếu", 
  "Kiên", "Nghĩa", "Vinh", "Long", "Quân", "Khoa", "Đạt", "Nhân", "Quyền", "Vương", 
  "Vũ", "Bình", "Kha", "Thịnh", "Tú", "Điệp", "Tiến", "Tùng", "Bảo", "Khánh", 
  "Văn", "Hậu", "Bách", "Đông", "Kiệt"
];

const tenDemNu = [
  "Thị", "Ngọc", "Thanh", "Thu", "Mỹ", "Như", "Xuân", "Hải", "Phương", "Anh", 
  "Kim", "Hồng", "Thùy", "Khánh", "Ánh", "Bảo", "Hoàng", "Đan", "Tố", "Diệu", 
  "Tú", "Yến", "Minh", "Quỳnh", "Thảo"
];

const tenNu = [
  "Mai", "Lan", "Trang", "Hương", "Phương", "Thảo", "Yến", "Hà", "Thu", "Linh", 
  "Dung", "Giang", "Hạnh", "Nhi", "Nhung", "Ngân", "Quyên", "Tuyết", "Hoa", "Đào", 
  "Nga", "Ánh", "Tâm", "Trinh", "Châu", "Vân", "My", "Quỳnh", "Uyên", "Ly", 
  "Loan", "Phượng", "Vy", "Ngọc", "Thương", "Quý", "An", "Hiền", "Oanh", "Diệp", 
  "Thi", "Nhiên", "Chi"
];

const westernGenZNames = [
  "Jenny", "David", "Alex", "Jessica", "Tony", "Sam", "Kevin", "Helen", "Tommy", 
  "Jack", "Eric", "Katy", "Daniel", "Daisy", "Anna", "Emily", "Ryan", "Sarah", 
  "Leo", "Brian", "Chloe", "Zoe", "Sunny", "Ruby", "Justin", "Alice", "Hannah", 
  "Lucas", "Felix", "Mia", "Grace", "Oliver", "Sophia", "Victoria", "Bella"
];

const genZNicknames = [
  "Bắp", "Miu", "Susu", "Kem", "Na", "Nhím", "Xoài", "Dâu", "Sữa", "Kẹo", 
  "Bơ", "Thỏ", "Mây", "Cam", "Mít", "Cút", "Xíu", "Bon", "Tít", "Sôcôla"
];

function getRandomVietnameseName() {
  const getRandomItem = arr => arr[Math.floor(Math.random() * arr.length)];
  const randType = Math.random();

  // 8% Tên Tây kết hợp Họ Việt (ví dụ: Jenny Nguyễn, Alex Trần, Kevin Hoàng)
  if (randType < 0.08) {
    const western = getRandomItem(westernGenZNames);
    const ho = getRandomItem(hoList);
    return Math.random() < 0.5 ? `${western} ${ho}` : `${ho} ${western}`;
  }

  // 4% Tên Nickname Gen Z thân mật (ví dụ: Nguyễn Bắp, Lê Miu, Trần Susu)
  if (randType < 0.12) {
    const ho = getRandomItem(hoList);
    const nick = getRandomItem(genZNicknames);
    return `${ho} ${nick}`;
  }

  // 88% Tên Việt truyền thống / hiện đại
  const isFemale = Math.random() < 0.5;
  const includeHo = Math.random() >= 0.06;
  const includeDem = Math.random() >= 0.06;

  const parts = [];

  if (includeHo) {
    parts.push(getRandomItem(hoList));
  }

  if (includeDem) {
    let tenDem = isFemale ? getRandomItem(tenDemNu) : getRandomItem(tenDemNam);
    // 30% xác suất có 2 tên đệm
    if (Math.random() < 0.30) {
      const extraList = (isFemale ? tenDemNu : tenDemNam).filter(d => d !== tenDem);
      if (extraList.length > 0) {
        tenDem = `${tenDem} ${getRandomItem(extraList)}`;
      }
    }
    parts.push(tenDem);
  }

  const ten = isFemale ? getRandomItem(tenNu) : getRandomItem(tenNam);
  parts.push(ten);

  let fullName = parts.join(' ');

  // Biến thể viết hoa/viết thường ngẫu nhiên:
  // 4% tất cả viết thường (ví dụ: nguyễn văn hùng)
  // 5% từ đầu viết thường (ví dụ: nguyễn Văn Hùng)
  // 4% từ đệm viết thường (ví dụ: Nguyễn văn Hùng)
  const randCase = Math.random();
  if (randCase < 0.04) {
    fullName = fullName.toLowerCase();
  } else if (randCase < 0.09) {
    const words = fullName.split(' ');
    words[0] = words[0].toLowerCase();
    fullName = words.join(' ');
  } else if (randCase < 0.13) {
    const words = fullName.split(' ');
    if (words.length > 2) {
      words[1] = words[1].toLowerCase();
      fullName = words.join(' ');
    }
  }

  return fullName;
}

document.addEventListener('DOMContentLoaded', async () => {
  const excelProductSelect = document.getElementById('excelProductSelect');
  const excelFileInput = document.getElementById('excelFileInput');
  const productUrlInput = document.getElementById('productUrlInput');
  const productIdInput = document.getElementById('productIdInput');
  const realProductId = document.getElementById('real_comment_post_ID');

  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  const realForm = document.getElementById('realForm');
  const commentInput = document.getElementById('commentInput');
  const charCount = document.getElementById('charCount');
  const btnSubmitSingle = document.getElementById('btnSubmitSingle');

  const batchTableBody = document.getElementById('batchTableBody');
  const btnAddRow = document.getElementById('btnAddRow');
  const btnLoadSampleBatch = document.getElementById('btnLoadSampleBatch');
  const btnStartBatch = document.getElementById('btnStartBatch');
  const btnStopBatch = document.getElementById('btnStopBatch');
  const progressSection = document.getElementById('progressSection');
  const progressText = document.getElementById('progressText');
  const progressPercent = document.getElementById('progressPercent');
  const progressBarFill = document.getElementById('progressBarFill');

  const templatesGrid = document.getElementById('templatesGrid');
  const logTerminal = document.getElementById('logTerminal');
  const btnClearLog = document.getElementById('btnClearLog');

  let allProducts = [];
  let isBatchRunning = false;

  function log(msg, type = 'info') {
    const time = new Date().toLocaleTimeString();
    const line = document.createElement('div');
    line.className = `log-line ${type}`;
    line.textContent = `[${time}] ${msg}`;
    logTerminal.appendChild(line);
    logTerminal.scrollTop = logTerminal.scrollHeight;
  }

  btnClearLog.addEventListener('click', () => { logTerminal.innerHTML = ''; });

  // Load products list from JSON or embedded array
  try {
    const res = await fetch('products.json');
    if (res.ok) {
      allProducts = await res.json();
    } else {
      allProducts = embeddedProducts;
    }
  } catch (e) {
    allProducts = embeddedProducts;
  }

  populateProductDropdown(allProducts);

  function populateProductDropdown(productsList) {
    excelProductSelect.innerHTML = '<option value="">-- Chọn sản phẩm từ danh sách Excel (${productsList.length} sản phẩm) --</option>';
    
    // Sort or group by category
    productsList.forEach((p, idx) => {
      const opt = document.createElement('option');
      opt.value = idx;
      opt.textContent = `[${p.category || 'Kuchen'}] ${p.name} (${p.sku || 'N/A'})`;
      if (p.url.includes('ku-rcdp3003')) {
        opt.selected = true;
      }
      excelProductSelect.appendChild(opt);
    });

    log(`[Excel] Đã nạp danh sách ${productsList.length} sản phẩm Kuchen vào Menu Chọn Nhanh.`, 'success');
  }

  // Handle Product Select change
  excelProductSelect.addEventListener('change', () => {
    const selectedIdx = excelProductSelect.value;
    if (selectedIdx !== '') {
      const p = allProducts[selectedIdx];
      if (p) {
        productUrlInput.value = p.url;
        log(`[Excel Target] Đã chọn sản phẩm: "${p.name}"`, 'info');
        log(`[Excel Target] URL: ${p.url}`, 'info');
      }
    }
  });

  // Client-side Excel File Uploading using SheetJS
  excelFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    log(`[Excel Upload] Đang đọc file: ${file.name}...`, 'info');
    const reader = new FileReader();

    reader.onload = (evt) => {
      try {
        const data = new Uint8Array(evt.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        log(`[Excel Upload] Đọc thành công các Sheet: ${workbook.SheetNames.join(', ')}`, 'info');

        // Look for 'Danh sách sản phẩm' or use first sheet
        let sheetName = workbook.SheetNames.find(s => s.includes('Danh sách')) || workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        const customProducts = [];
        for (let i = 0; i < rows.length; i++) {
          const r = rows[i];
          if (r && r.length >= 2) {
            // Find URL string
            const urlCol = r.find(col => typeof col === 'string' && col.startsWith('http'));
            const nameCol = r.find(col => typeof col === 'string' && col.length > 5 && !col.startsWith('http'));

            if (urlCol && nameCol) {
              customProducts.push({
                category: 'Tự nạp',
                name: nameCol,
                sku: '',
                url: urlCol
              });
            }
          }
        }

        if (customProducts.length > 0) {
          allProducts = customProducts;
          populateProductDropdown(allProducts);
          log(`[Excel Upload] 🎉 Đã trích xuất ${customProducts.length} sản phẩm từ file Excel của bạn!`, 'success');
        } else {
          log(`[Excel Upload] ⚠️ Không tìm thấy đường link URL sản phẩm trong file.`, 'warning');
        }
      } catch (err) {
        log(`[Excel Upload] ❌ Lỗi đọc file Excel: ${err.message}`, 'error');
      }
    };

    reader.readAsArrayBuffer(file);
  });

  // Sync Product ID
  productIdInput.addEventListener('input', () => {
    realProductId.value = productIdInput.value.trim();
  });

  // Tab switching
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.getAttribute('data-tab')).classList.add('active');
    });
  });

  // Char Counter
  commentInput.addEventListener('input', () => {
    const len = commentInput.value.length;
    charCount.textContent = `${len} ký tự ${len >= 10 ? '(Hợp lệ)' : '(Tối thiểu 10)'}`;
    charCount.style.color = len >= 10 ? '#34d399' : '#f87171';
  });

  // Single Submission
  realForm.addEventListener('submit', () => {
    realProductId.value = productIdInput.value.trim();
    const author = document.getElementById('authorInput').value;
    log(`[Single Review] Đang gửi đánh giá của "${author}" cho Product ID ${realProductId.value}...`, 'info');
    
    btnSubmitSingle.disabled = true;
    btnSubmitSingle.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang gửi...';

    setTimeout(() => {
      btnSubmitSingle.disabled = false;
      btnSubmitSingle.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Gửi Đánh Giá Ngay';
      log(`[Single Review] 🎉 THÀNH CÔNG: Đã phát request gửi đánh giá lên kuchen.vn!`, 'success');
      alert('🎉 Đánh giá đã được gửi thành công!');
    }, 1500);
  });

  // Batch Table Management
  function addBatchRow(data = {}) {
    const tr = document.createElement('tr');
    const defaultAuthor = data.author || getRandomVietnameseName();
    tr.innerHTML = `
      <td class="row-idx">${batchTableBody.children.length + 1}</td>
      <td><input type="text" class="b-author" value="${defaultAuthor}" placeholder="Họ tên"></td>
      <td><input type="text" class="b-phone" value="${data.phone || ''}" placeholder="SĐT"></td>
      <td>
        <select class="b-rating">
          <option value="5" ${data.rating == 5 ? 'selected' : ''}>5 ★</option>
          <option value="4" ${data.rating == 4 ? 'selected' : ''}>4 ★</option>
          <option value="3" ${data.rating == 3 ? 'selected' : ''}>3 ★</option>
        </select>
      </td>
      <td><input type="text" class="b-comment" value="${data.comment || ''}" placeholder="Nội dung"></td>
      <td><button class="btn btn-sm btn-danger del-btn"><i class="fa-solid fa-xmark"></i></button></td>
    `;
    tr.querySelector('.del-btn').addEventListener('click', () => { tr.remove(); reindex(); });
    batchTableBody.appendChild(tr);
  }

  function reindex() {
    Array.from(batchTableBody.children).forEach((r, i) => r.querySelector('.row-idx').textContent = i + 1);
  }

  btnAddRow.addEventListener('click', () => addBatchRow());

  btnLoadSampleBatch.addEventListener('click', () => {
    batchTableBody.innerHTML = '';
    [
      { author: getRandomVietnameseName(), phone: '0987112233', rating: 5, comment: 'Sản phẩm Kuchen dùng chất lượng tuyệt vời, nấu dẻo ngon.' },
      { author: getRandomVietnameseName(), phone: '0912445566', rating: 5, comment: 'Giao hàng nhanh, đóng gói cẩn thận, hàng chính hãng Kuchen.' },
      { author: getRandomVietnameseName(), phone: '0936778899', rating: 5, comment: 'Chất lượng xịn xò, giữ ấm lâu, thiết kế tinh tế sang trọng.' }
    ].forEach(d => addBatchRow(d));
    log('[Batch] Đã nạp 3 đánh giá mẫu.', 'info');
  });

  btnLoadSampleBatch.click();

  // Batch Execution in Browser
  btnStartBatch.addEventListener('click', async () => {
    const rows = Array.from(batchTableBody.children);
    if (rows.length === 0) {
      log('Vui lòng thêm ít nhất 1 hàng!', 'warning');
      return;
    }

    const items = [];
    for (let r of rows) {
      const author = r.querySelector('.b-author').value.trim();
      const phone = r.querySelector('.b-phone').value.trim();
      const rating = r.querySelector('.b-rating').value;
      const comment = r.querySelector('.b-comment').value.trim();
      if (!author || !phone || !comment) {
        log('Vui lòng điền đủ Họ tên, SĐT và Nội dung cho tất cả hàng!', 'warning');
        return;
      }
      items.push({ author, phone, rating, comment });
    }

    isBatchRunning = true;
    btnStartBatch.style.display = 'none';
    btnStopBatch.style.display = 'inline-flex';
    progressSection.style.display = 'block';

    const minD = parseInt(document.getElementById('minDelayInput').value) || 3;
    const maxD = parseInt(document.getElementById('maxDelayInput').value) || 7;
    const pid = productIdInput.value.trim();

    log(`[Batch] 🚀 Bắt đầu tiến trình gửi ${items.length} đánh giá trực tiếp từ Browser...`, 'info');

    for (let i = 0; i < items.length; i++) {
      if (!isBatchRunning) break;
      const item = items[i];

      log(`[Batch] [${i+1}/${items.length}] Đang gửi đánh giá của "${item.author}"...`, 'info');

      // Submit via iframe
      const tempForm = document.createElement('form');
      tempForm.action = 'https://kuchen.vn/wp-comments-post.php';
      tempForm.method = 'POST';
      tempForm.target = 'hidden_submit_iframe';

      const fields = {
        comment_post_ID: pid,
        comment_parent: '0',
        submit: 'Gửi đánh giá ngay',
        author: item.author,
        phone: item.phone,
        rating: item.rating,
        comment: item.comment
      };

      for (let key in fields) {
        const inp = document.createElement('input');
        inp.type = 'hidden';
        inp.name = key;
        inp.value = fields[key];
        tempForm.appendChild(inp);
      }

      document.body.appendChild(tempForm);
      tempForm.submit();
      document.body.removeChild(tempForm);

      const pct = Math.round(((i + 1) / items.length) * 100);
      progressBarFill.style.width = `${pct}%`;
      progressPercent.textContent = `${pct}%`;
      progressText.textContent = `Đã xử lý ${i + 1}/${items.length}...`;

      log(`[Batch] ✅ [${i+1}/${items.length}] Đã phát request gửi thành công cho "${item.author}"!`, 'success');

      if (i < items.length - 1 && isBatchRunning) {
        const delaySec = Math.floor(Math.random() * (maxD - minD + 1)) + minD;
        log(`[Batch] ⏳ Đang chờ ${delaySec}s để đảm bảo tự nhiên (anti-spam)...`, 'info');
        await new Promise(r => setTimeout(r, delaySec * 1000));
      }
    }

    log('[Batch] 🎉 ĐÃ HOÀN THÀNH TẤT CẢ LƯỢT GỬI HÀNG LOẠT!', 'success');
    stopBatch();
  });

  function stopBatch() {
    isBatchRunning = false;
    btnStartBatch.style.display = 'inline-flex';
    btnStopBatch.style.display = 'none';
  }

  btnStopBatch.addEventListener('click', () => {
    log('[Batch] ⏹️ Đã dừng gửi hàng loạt.', 'warning');
    stopBatch();
  });

  // Templates
  const sampleTpls = [
    { title: 'Khen cơm dẻo & hạt nở đều', rating: 5, text: 'Nồi cơm điện Kuchen KU RCDP3003 dùng tuyệt vời. Cơm chín dẻo mềm, giữ trọn vị thơm ngon.' },
    { title: 'Thiết kế Đức sang trọng', rating: 5, text: 'Nồi thiết kế hiện đại, hoàn thiện tỉ mỉ. Lòng nồi dày dặn cầm rất chắc chắn.' },
    { title: 'Giữ ấm lâu cả ngày', rating: 5, text: 'Chế độ giữ nhiệt tốt, nấu buổi sáng tới chiều tối cơm vẫn ấm nóng như mới nấu.' }
  ];

  sampleTpls.forEach(t => {
    const div = document.createElement('div');
    div.className = 'template-card';
    div.innerHTML = `
      <div>
        <strong>${t.title}</strong>
        <p class="template-text" style="margin-top:6px;">"${t.text}"</p>
      </div>
      <button class="btn btn-sm btn-outline btn-use-tpl"><i class="fa-solid fa-copy"></i> Dùng Mẫu Này</button>
    `;
    div.querySelector('.btn-use-tpl').addEventListener('click', () => {
      commentInput.value = t.text;
      commentInput.dispatchEvent(new Event('input'));
      document.querySelector('[data-tab="tabSingle"]').click();
      log(`[Template] Đã áp dụng mẫu: "${t.title}"`, 'info');
    });
    templatesGrid.appendChild(div);
  });
});
