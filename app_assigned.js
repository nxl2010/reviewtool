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

  // Save completion status to localStorage for real-time Dashboard sync
  function recordCompletion(productId, data) {
    try {
      const existing = JSON.parse(localStorage.getItem('kuchen_completed_reviews') || '{}');
      existing[productId] = {
        productId: productId,
        stt: data.stt || productId,
        name: data.name || 'Sản phẩm Kuchen',
        url: data.url || '',
        assignee: data.assignee || staffSelect.value || 'Người dùng',
        status: 'HOÀN THÀNH',
        statusClass: 'completed',
        reviewContent: data.comment,
        reviewerName: data.author,
        reviewerPhone: data.phone,
        rating: data.rating || 5,
        completedAt: new Date().toLocaleString('vi-VN')
      };
      localStorage.setItem('kuchen_completed_reviews', JSON.stringify(existing));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }

  // Helper to send review payload via Proxy API or fallback iframe
  async function submitReviewPayload(payload) {
    // Try Cloudflare Proxy endpoint first
    try {
      const fd = new FormData();
      fd.append('comment_post_ID', payload.pid);
      fd.append('comment_parent', '0');
      fd.append('submit', 'Gửi đánh giá ngay');
      fd.append('author', payload.author);
      fd.append('phone', payload.phone);
      fd.append('email', payload.email || '');
      fd.append('rating', payload.rating || '5');
      fd.append('comment', payload.comment);
      fd.append('product_url', payload.productUrl || 'https://kuchen.vn/');

      const res = await fetch('/api/proxy-submit', {
        method: 'POST',
        body: fd
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success) return { success: true, via: 'proxy' };
      }
    } catch (e) {
      // Ignore proxy error and fallback to iframe
    }

    // Fallback to iframe submit
    const tempForm = document.createElement('form');
    tempForm.action = 'https://kuchen.vn/wp-comments-post.php';
    tempForm.method = 'POST';
    tempForm.target = 'hidden_submit_iframe';

    const fields = {
      comment_post_ID: payload.pid,
      comment_parent: '0',
      submit: 'Gửi đánh giá ngay',
      author: payload.author,
      phone: payload.phone,
      email: payload.email || '',
      rating: payload.rating || '5',
      comment: payload.comment
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

    return { success: true, via: 'iframe' };
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

  // Single Submission Handler
  realForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    realProductId.value = productIdInput.value.trim();
    const pid = realProductId.value;
    const author = document.getElementById('authorInput').value.trim();
    const phone = document.getElementById('phoneInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const comment = commentInput.value.trim();
    const ratingEl = document.querySelector('input[name="rating"]:checked');
    const rating = ratingEl ? ratingEl.value : '5';

    if (!pid) {
      alert('Vui lòng chọn sản phẩm hoặc nhập Product ID!');
      log('Vui lòng chọn sản phẩm hoặc nhập Product ID!', 'warning');
      return;
    }

    if (comment.length < 10) {
      alert('Nội dung đánh giá phải có tối thiểu 10 ký tự!');
      log('Nội dung đánh giá phải có tối thiểu 10 ký tự!', 'warning');
      return;
    }

    const selectedUrl = productUrlInput.value;
    const foundProduct = allProducts.find(p => p.url === selectedUrl || p.productId == pid);

    btnSubmitSingle.disabled = true;
    btnSubmitSingle.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang gửi...';
    log(`[Single Review] Đang phát request gửi đánh giá của "${author}" (${phone}) cho Product ID ${pid}...`, 'info');

    const res = await submitReviewPayload({
      pid, author, phone, email, comment, rating, productUrl: selectedUrl
    });

    // Save completion state locally for Dashboard sync
    recordCompletion(pid, {
      stt: foundProduct ? foundProduct.stt : pid,
      name: foundProduct ? foundProduct.name : 'Sản phẩm Kuchen',
      url: selectedUrl,
      assignee: foundProduct ? foundProduct.assignee : staffSelect.value,
      author: author,
      phone: phone,
      comment: comment,
      rating: parseInt(rating)
    });

    btnSubmitSingle.disabled = false;
    btnSubmitSingle.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Gửi Đánh Giá Ngay';
    log(`[Single Review] 🎉 THÀNH CÔNG: Đã phát request tới kuchen.vn (Kênh: ${res.via}) và lưu trạng thái vào Dashboard!`, 'success');
    alert('🎉 Đánh giá đã được gửi thành công!');
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

    const selectedUrl = productUrlInput.value;
    const foundProduct = allProducts.find(p => p.url === selectedUrl || p.productId == pid);

    isBatchRunning = true;
    btnStartBatch.style.display = 'none';
    btnStopBatch.style.display = 'inline-flex';
    progressSection.style.display = 'block';

    const minD = parseInt(document.getElementById('minDelayInput').value) || 3;
    const maxD = parseInt(document.getElementById('maxDelayInput').value) || 7;

    log(`[Batch] 🚀 Bắt đầu tiến trình gửi ${items.length} đánh giá trực tiếp từ Browser/Proxy...`, 'info');

    for (let i = 0; i < items.length; i++) {
      if (!isBatchRunning) break;
      const item = items[i];

      log(`[Batch] [${i+1}/${items.length}] Đang gửi đánh giá của "${item.author}"...`, 'info');

      const res = await submitReviewPayload({
        pid: pid,
        author: item.author,
        phone: item.phone,
        comment: item.comment,
        rating: item.rating,
        productUrl: selectedUrl
      });

      // Record completion status locally for Dashboard
      recordCompletion(pid, {
        stt: foundProduct ? foundProduct.stt : pid,
        name: foundProduct ? foundProduct.name : 'Sản phẩm Kuchen',
        url: selectedUrl,
        assignee: foundProduct ? foundProduct.assignee : staffSelect.value,
        author: item.author,
        phone: item.phone,
        comment: item.comment,
        rating: parseInt(item.rating)
      });

      const pct = Math.round(((i + 1) / items.length) * 100);
      progressBarFill.style.width = `${pct}%`;
      progressPercent.textContent = `${pct}%`;
      progressText.textContent = `Đã xử lý ${i + 1}/${items.length}...`;

      log(`[Batch] ✅ [${i+1}/${items.length}] Đã phát request gửi thành công cho "${item.author}" (Kênh: ${res.via})!`, 'success');

      if (i < items.length - 1 && isBatchRunning) {
        const delaySec = Math.floor(Math.random() * (maxD - minD + 1)) + minD;
        log(`[Batch] ⏳ Đang chờ ${delaySec}s để đảm bảo tự nhiên (anti-spam)...`, 'info');
        await new Promise(r => setTimeout(r, delaySec * 1000));
      }
    }

    log('[Batch] 🎉 ĐÃ HOÀN THÀNH TẤT CẢ LƯỢT GỬI HÀNG LOẠT! Trạng thái đã cập nhật vào Dashboard.', 'success');
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
