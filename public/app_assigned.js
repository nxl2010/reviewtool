// Staff Assignment data
const staffListDefault = [
  { "staffName": "Chí Sơn", "fromStt": 1, "toStt": 10, "count": 10 },
  { "staffName": "Huỳnh Sơn", "fromStt": 11, "toStt": 20, "count": 10 },
  { "staffName": "Nguyễn Dũng", "fromStt": 21, "toStt": 30, "count": 10 },
  { "staffName": "Như Vinh", "fromStt": 31, "toStt": 40, "count": 10 },
  { "staffName": "Tâm HCM", "fromStt": 41, "toStt": 50, "count": 10 },
  { "staffName": "Thị Hà Nội", "fromStt": 51, "toStt": 60, "count": 10 },
  { "staffName": "Nguyễn Xuân Tú", "fromStt": 61, "toStt": 70, "count": 10 },
  { "staffName": "Phạm Quang Điệp", "fromStt": 71, "toStt": 80, "count": 10 },
  { "staffName": "Hoàng Văn Tiến", "fromStt": 81, "toStt": 90, "count": 10 },
  { "staffName": "Chu Xuân Thành", "fromStt": 91, "toStt": 100, "count": 10 },
  { "staffName": "Lê Thanh Phong", "fromStt": 101, "toStt": 110, "count": 10 },
  { "staffName": "Hoàng Tùng", "fromStt": 111, "toStt": 119, "count": 9 },
  { "staffName": "Nguyễn Xuân Lâm", "fromStt": 120, "toStt": 128, "count": 9 }
];

document.addEventListener('DOMContentLoaded', async () => {
  const staffSelect = document.getElementById('staffSelect');
  const staffProductCountBadge = document.getElementById('staffProductCountBadge');
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
  const btnStartBatch = document.getElementById('btnStartBatch');
  const btnStopBatch = document.getElementById('btnStopBatch');
  const progressSection = document.getElementById('progressSection');
  const progressText = document.getElementById('progressText');
  const progressPercent = document.getElementById('progressPercent');
  const progressBarFill = document.getElementById('progressBarFill');

  const logTerminal = document.getElementById('logTerminal');
  const btnClearLog = document.getElementById('btnClearLog');

  let allProducts = [];
  let staffList = staffListDefault;
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

  // Load datasets
  try {
    const [pRes, sRes] = await Promise.all([
      fetch('products_assigned.json'),
      fetch('staff_list.json')
    ]);
    if (pRes.ok) allProducts = await pRes.json();
    if (sRes.ok) staffList = await sRes.json();
  } catch (e) {
    console.warn('Using fallback memory dataset');
  }

  populateStaffDropdown(staffList);
  filterProductsByStaff('ALL');

  function populateStaffDropdown(sList) {
    staffSelect.innerHTML = '<option value="ALL">-- Tất cả sản phẩm (128 sản phẩm) --</option>';
    sList.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s.staffName;
      opt.textContent = `👤 ${s.staffName} (STT ${s.fromStt} -> ${s.toStt}: ${s.count} SP)`;
      staffSelect.appendChild(opt);
    });
  }

  // Handle staff selection change
  staffSelect.addEventListener('change', () => {
    const selectedStaff = staffSelect.value;
    filterProductsByStaff(selectedStaff);
  });

  function filterProductsByStaff(staffName) {
    excelProductSelect.innerHTML = '';

    let filtered = allProducts;
    if (staffName !== 'ALL') {
      filtered = allProducts.filter(p => p.assignee === staffName);
      staffProductCountBadge.textContent = `Phụ trách: ${staffName} (${filtered.length} SP)`;
      log(`[Phân Công] 👤 Bạn đã chọn: "${staffName}". Tìm thấy ${filtered.length} sản phẩm được giao cho bạn.`, 'success');
    } else {
      staffProductCountBadge.textContent = `Tất cả: ${allProducts.length} SP`;
      log(`[Phân Công] Hiển thị tất cả ${allProducts.length} sản phẩm Kuchen.`, 'info');
    }

    if (filtered.length === 0) {
      excelProductSelect.innerHTML = '<option value="">-- Không có sản phẩm nào --</option>';
      return;
    }

    const defaultOpt = document.createElement('option');
    defaultOpt.value = '';
    defaultOpt.textContent = `-- Chọn sản phẩm trong danh sách (${filtered.length} sản phẩm) --`;
    excelProductSelect.appendChild(defaultOpt);

    filtered.forEach((p) => {
      const opt = document.createElement('option');
      opt.value = p.url;
      const idText = p.productId ? `ID: ${p.productId}` : `STT ${p.stt}`;
      opt.textContent = `[${idText}] [${p.assignee}] ${p.name} (${p.sku || 'N/A'})`;
      excelProductSelect.appendChild(opt);
    });
  }

  // Handle product select change
  excelProductSelect.addEventListener('change', () => {
    const selectedUrl = excelProductSelect.value;
    if (selectedUrl) {
      productUrlInput.value = selectedUrl;
      const found = allProducts.find(p => p.url === selectedUrl);
      if (found) {
        // Auto set Product ID using real WooCommerce ID
        const targetId = found.productId || (found.stt === 4 || found.stt === 100 ? '9778' : found.stt);
        productIdInput.value = targetId;
        realProductId.value = targetId;
        log(`[Sản Phẩm] Đã chọn: "${found.name}" (Real Product ID: ${targetId})`, 'info');
      }
    } else {
      productUrlInput.value = '';
      productIdInput.value = '';
      realProductId.value = '';
    }
  });

  // Client-side Excel upload override
  excelFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    log(`[Excel Upload] Đang đọc file: ${file.name}...`, 'info');
    const reader = new FileReader();

    reader.onload = (evt) => {
      try {
        const data = new Uint8Array(evt.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        
        let sheetName = workbook.SheetNames.find(s => s.includes('Danh sách')) || workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        const customProducts = [];
        const customStaff = new Set();

        for (let i = 0; i < rows.length; i++) {
          const r = rows[i];
          if (r && r.length >= 2) {
            const urlCol = r.find(col => typeof col === 'string' && col.startsWith('http'));
            const nameCol = r.find(col => typeof col === 'string' && col.length > 5 && !col.startsWith('http'));
            const staffCol = r[8] || r[7] || 'Tự nạp';

            if (urlCol && nameCol) {
              customProducts.push({
                stt: i,
                name: nameCol,
                url: urlCol,
                assignee: staffCol
              });
              if (staffCol && staffCol !== 'Tự nạp') customStaff.add(staffCol);
            }
          }
        }

        if (customProducts.length > 0) {
          allProducts = customProducts;
          log(`[Excel Upload] 🎉 Đã nạp thành công ${customProducts.length} sản phẩm từ file Excel!`, 'success');

          const sArray = Array.from(customStaff).map(s => ({ staffName: s, fromStt: 1, toStt: customProducts.length, count: customProducts.length }));
          if (sArray.length > 0) populateStaffDropdown(sArray);

          filterProductsByStaff('ALL');
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
  realForm.addEventListener('submit', (e) => {
    realProductId.value = productIdInput.value.trim();
    const author = document.getElementById('authorInput').value.trim();
    const phone = document.getElementById('phoneInput').value.trim();
    const comment = commentInput.value.trim();

    if (!realProductId.value) {
      e.preventDefault();
      alert('Vui lòng chọn sản phẩm hoặc nhập Product ID!');
      log('Vui lòng chọn sản phẩm hoặc nhập Product ID!', 'warning');
      return;
    }

    if (comment.length < 10) {
      e.preventDefault();
      alert('Nội dung đánh giá phải có tối thiểu 10 ký tự!');
      log('Nội dung đánh giá phải có tối thiểu 10 ký tự!', 'warning');
      return;
    }

    log(`[Single Review] Đang gửi đánh giá của "${author}" (${phone}) cho Product ID ${realProductId.value}...`, 'info');
    
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
    tr.innerHTML = `
      <td class="row-idx">${batchTableBody.children.length + 1}</td>
      <td><input type="text" class="b-author" value="${data.author || ''}" placeholder="Họ tên"></td>
      <td><input type="text" class="b-phone" value="${data.phone || ''}" placeholder="SĐT"></td>
      <td>
        <select class="b-rating">
          <option value="5" ${data.rating == 5 ? 'selected' : ''}>5 ★</option>
          <option value="4" ${data.rating == 4 ? 'selected' : ''}>4 ★</option>
          <option value="3" ${data.rating == 3 ? 'selected' : ''}>3 ★</option>
        </select>
      </td>
      <td><input type="text" class="b-comment" value="${data.comment || ''}" placeholder="Nội dung đánh giá..."></td>
      <td><button class="btn btn-sm btn-danger del-btn"><i class="fa-solid fa-xmark"></i></button></td>
    `;
    tr.querySelector('.del-btn').addEventListener('click', () => { tr.remove(); reindex(); });
    batchTableBody.appendChild(tr);
  }

  function reindex() {
    Array.from(batchTableBody.children).forEach((r, i) => r.querySelector('.row-idx').textContent = i + 1);
  }

  btnAddRow.addEventListener('click', () => addBatchRow());

  // Add 1 blank row by default
  addBatchRow();

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
        log('Vui lòng điền đủ Họ tên, SĐT và Nội dung cho tất cả các hàng!', 'warning');
        alert('Vui lòng điền đủ Họ tên, SĐT và Nội dung cho tất cả các hàng!');
        return;
      }
      items.push({ author, phone, rating, comment });
    }

    const pid = productIdInput.value.trim();
    if (!pid) {
      alert('Vui lòng chọn sản phẩm hoặc nhập Product ID!');
      log('Vui lòng chọn sản phẩm hoặc nhập Product ID!', 'warning');
      return;
    }

    isBatchRunning = true;
    btnStartBatch.style.display = 'none';
    btnStopBatch.style.display = 'inline-flex';
    progressSection.style.display = 'block';

    const minD = parseInt(document.getElementById('minDelayInput').value) || 3;
    const maxD = parseInt(document.getElementById('maxDelayInput').value) || 7;

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
});
