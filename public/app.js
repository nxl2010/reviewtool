document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const productUrlInput = document.getElementById('productUrlInput');
  const btnFetchProduct = document.getElementById('btnFetchProduct');
  const productTitle = document.getElementById('productTitle');
  const productIdBadge = document.getElementById('productIdBadge');

  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  const singleForm = document.getElementById('singleReviewForm');
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

  let currentProductId = '9778';
  let activeEventSource = null;

  // Log Helper
  function log(message, type = 'info') {
    const time = new Date().toLocaleTimeString();
    const line = document.createElement('div');
    line.className = `log-line ${type}`;
    line.textContent = `[${time}] ${message}`;
    logTerminal.appendChild(line);
    logTerminal.scrollTop = logTerminal.scrollHeight;
  }

  btnClearLog.addEventListener('click', () => {
    logTerminal.innerHTML = '';
    log('[System] Đã xóa nhật ký.', 'info');
  });

  // Tab Switching
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetTab = btn.getAttribute('data-tab');
      document.getElementById(targetTab).classList.add('active');
    });
  });

  // Fetch Product ID from URL
  async function fetchProductId() {
    const url = productUrlInput.value.trim();
    if (!url) {
      log('Vui lòng nhập URL sản phẩm!', 'warning');
      return;
    }

    btnFetchProduct.disabled = true;
    btnFetchProduct.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang tải...';
    log(`[Product] Đang kiểm tra URL: ${url}`, 'info');

    try {
      const res = await fetch('/api/extract-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      const data = await res.json();

      if (data.success) {
        currentProductId = data.data.productId;
        productTitle.textContent = data.data.title;
        productIdBadge.textContent = currentProductId;
        log(`[Product] ✅ Đã tìm thấy Product ID: ${currentProductId} (${data.data.title})`, 'success');
      } else {
        log(`[Product] ❌ ${data.error}`, 'error');
      }
    } catch (e) {
      log(`[Product] ❌ Lỗi kết nối server: ${e.message}`, 'error');
    } finally {
      btnFetchProduct.disabled = false;
      btnFetchProduct.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i> Kiểm Tra Product ID';
    }
  }

  btnFetchProduct.addEventListener('click', fetchProductId);

  // Character Counter for Single Review
  commentInput.addEventListener('input', () => {
    const len = commentInput.value.length;
    if (len >= 10) {
      charCount.textContent = `${len} ký tự (Hợp lệ)`;
      charCount.style.color = '#34d399';
    } else {
      charCount.textContent = `${len} ký tự (Tối thiểu 10)`;
      charCount.style.color = '#f87171';
    }
  });

  // Submit Single Review
  singleForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const author = document.getElementById('authorInput').value.trim();
    const phone = document.getElementById('phoneInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const rating = document.querySelector('input[name="rating"]:checked').value;
    const comment = commentInput.value.trim();

    if (comment.length < 10) {
      log('Nội dung đánh giá phải có tối thiểu 10 ký tự!', 'warning');
      return;
    }

    btnSubmitSingle.disabled = true;
    btnSubmitSingle.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang gửi...';
    log(`[Single Review] Gửi đánh giá từ "${author}" (${rating}⭐)...`, 'info');

    try {
      const res = await fetch('/api/submit-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: currentProductId,
          productUrl: productUrlInput.value.trim(),
          author,
          phone,
          email,
          rating,
          comment
        })
      });

      const data = await res.json();
      if (data.success) {
        log(`[Single Review] 🎉 THÀNH CÔNG: Đã gửi đánh giá của "${author}" lên kuchen.vn!`, 'success');
        alert('🎉 Gửi đánh giá thành công!');
      } else {
        log(`[Single Review] ❌ Thất bại: ${data.error}`, 'error');
        alert('❌ Gửi thất bại: ' + data.error);
      }
    } catch (err) {
      log(`[Single Review] ❌ Lỗi kết nối: ${err.message}`, 'error');
    } finally {
      btnSubmitSingle.disabled = false;
      btnSubmitSingle.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Gửi Đánh Giá Ngay';
    }
  });

  // Batch Review Table Management
  function addBatchRow(data = {}) {
    const row = document.createElement('tr');
    const index = batchTableBody.children.length + 1;

    row.innerHTML = `
      <td class="row-index">${index}</td>
      <td><input type="text" class="batch-author" value="${data.author || ''}" placeholder="Họ tên"></td>
      <td><input type="text" class="batch-phone" value="${data.phone || ''}" placeholder="SĐT"></td>
      <td>
        <select class="batch-rating">
          <option value="5" ${data.rating == 5 ? 'selected' : ''}>5 ★</option>
          <option value="4" ${data.rating == 4 ? 'selected' : ''}>4 ★</option>
          <option value="3" ${data.rating == 3 ? 'selected' : ''}>3 ★</option>
          <option value="2" ${data.rating == 2 ? 'selected' : ''}>2 ★</option>
          <option value="1" ${data.rating == 1 ? 'selected' : ''}>1 ★</option>
        </select>
      </td>
      <td><input type="text" class="batch-comment" value="${data.comment || ''}" placeholder="Nội dung đánh giá..."></td>
      <td style="text-align: center;">
        <button class="btn btn-sm btn-danger btn-delete-row"><i class="fa-solid fa-xmark"></i></button>
      </td>
    `;

    row.querySelector('.btn-delete-row').addEventListener('click', () => {
      row.remove();
      updateTableIndices();
    });

    batchTableBody.appendChild(row);
  }

  function updateTableIndices() {
    Array.from(batchTableBody.children).forEach((row, i) => {
      row.querySelector('.row-index').textContent = i + 1;
    });
  }

  btnAddRow.addEventListener('click', () => addBatchRow());

  // Sample Batch Data
  const sampleBatchData = [
    {
      author: 'Nguyễn Thanh Tùng',
      phone: '0988123456',
      rating: 5,
      comment: 'Nồi cơm điện KU RCDP3003 thiết kế rất đẹp mắt, cơm nấu ra dẻo thơm, ăn ngon miệng lắm.'
    },
    {
      author: 'Phạm Thị Ngọc',
      phone: '0912987654',
      rating: 5,
      comment: 'Hàng chính hãng Kuchen chất lượng tuyệt vời, nắp tháo rời vệ sinh rất tiện lợi.'
    },
    {
      author: 'Lê Hoàng Nam',
      phone: '0934567890',
      rating: 5,
      comment: 'Bảo hành đầy đủ, giao hàng nhanh chóng. Nồi cơm thông minh dung tích vừa vặn cho gia đình.'
    }
  ];

  btnLoadSampleBatch.addEventListener('click', () => {
    batchTableBody.innerHTML = '';
    sampleBatchData.forEach(item => addBatchRow(item));
    log('[Batch] Đã nạp 3 đánh giá mẫu vào bảng hàng loạt.', 'info');
  });

  // Start Batch Execution
  btnStartBatch.addEventListener('click', () => {
    const rows = Array.from(batchTableBody.children);
    if (rows.length === 0) {
      log('[Batch] Vui lòng thêm ít nhất 1 dòng đánh giá!', 'warning');
      return;
    }

    const reviews = [];
    for (let r of rows) {
      const author = r.querySelector('.batch-author').value.trim();
      const phone = r.querySelector('.batch-phone').value.trim();
      const rating = r.querySelector('.batch-rating').value;
      const comment = r.querySelector('.batch-comment').value.trim();

      if (!author || !phone || !comment) {
        log('[Batch] ⚠️ Vui lòng điền đầy đủ Họ tên, SĐT và Nội dung cho tất cả các hàng!', 'warning');
        return;
      }
      reviews.push({ author, phone, rating, comment });
    }

    const minDelay = parseInt(document.getElementById('minDelayInput').value) || 3;
    const maxDelay = parseInt(document.getElementById('maxDelayInput').value) || 8;

    progressSection.style.display = 'block';
    btnStartBatch.style.display = 'none';
    btnStopBatch.style.display = 'inline-flex';

    log(`[Batch] 🚀 Bắt đầu gửi hàng loạt ${reviews.length} đánh giá...`, 'info');

    const payload = {
      productId: currentProductId,
      productUrl: productUrlInput.value.trim(),
      reviews,
      minDelay,
      maxDelay
    };

    const sseUrl = `/api/batch-stream?data=${encodeURIComponent(JSON.stringify(payload))}`;
    activeEventSource = new EventSource(sseUrl);

    activeEventSource.onmessage = (e) => {
      const msg = JSON.parse(e.data);

      if (msg.type === 'start') {
        progressText.textContent = `Đang gửi 0/${msg.total} đánh giá...`;
        progressBarFill.style.width = '0%';
        progressPercent.textContent = '0%';
      } else if (msg.type === 'submitting') {
        log(`[Batch] [${msg.index}/${msg.total}] Đang gửi đánh giá của "${msg.item.author}"...`, 'info');
      } else if (msg.type === 'item_result') {
        const pct = Math.round((msg.index / msg.total) * 100);
        progressBarFill.style.width = `${pct}%`;
        progressPercent.textContent = `${pct}%`;
        progressText.textContent = `Đã hoàn thành ${msg.index}/${msg.total} đánh giá...`;

        if (msg.result.success) {
          log(`[Batch] ✅ [${msg.index}/${msg.total}] Đánh giá của "${msg.item.author}" gửi thành công!`, 'success');
        } else {
          log(`[Batch] ❌ [${msg.index}/${msg.total}] Lỗi đánh giá "${msg.item.author}": ${msg.result.error}`, 'error');
        }
      } else if (msg.type === 'delay') {
        log(`[Batch] ⏳ Tạm dừng ${msg.seconds}s để đảm bảo tự nhiên (anti-spam)...`, 'info');
      } else if (msg.type === 'complete') {
        log(`[Batch] 🎉 ĐÃ HOÀN THÀNH TẤT CẢ LƯỢT GỬI HÀNG LOẠT!`, 'success');
        finishBatch();
      }
    };

    activeEventSource.onerror = () => {
      log('[Batch] ❌ Mất kết nối đường truyền với server.', 'error');
      finishBatch();
    };
  });

  function finishBatch() {
    if (activeEventSource) {
      activeEventSource.close();
      activeEventSource = null;
    }
    btnStartBatch.style.display = 'inline-flex';
    btnStopBatch.style.display = 'none';
  }

  btnStopBatch.addEventListener('click', () => {
    log('[Batch] ⏹️ Đã hủy tiến trình gửi hàng loạt.', 'warning');
    finishBatch();
  });

  // Template Store
  const templates = [
    {
      title: 'Khen cơm ngon & dẻo',
      rating: 5,
      content: 'Nồi cơm điện Kuchen KU RCDP3003 dùng cực kỳ ưng ý. Cơm nấu chín đều, giữ trọn vị ngọt thơm và không bị dính đáy nồi.'
    },
    {
      title: 'Đánh giá thiết kế & độ bền',
      rating: 5,
      content: 'Kiểu dáng sang trọng hiện đại, phím bấm nhạy. Nồi dày dặn đầm tay, cảm giác dùng hàng thương hiệu Đức cao cấp.'
    },
    {
      title: 'Giữ ấm lâu & tiết kiệm điện',
      rating: 5,
      content: 'Nồi giữ ấm cơm từ sáng đến tối vẫn mềm ngon như vừa mới nấu xong. Rất đáng đồng tiền bát gạo!'
    },
    {
      title: 'Dịch vụ & đóng gói',
      rating: 5,
      content: 'Giao hàng Kuchen rất nhanh, đóng gói cẩn thận 2 lớp hộp. Nhân viên hỗ trợ tư vấn bảo hành nhiệt tình 10/10.'
    }
  ];

  templates.forEach(tpl => {
    const card = document.createElement('div');
    card.className = 'template-card';
    card.innerHTML = `
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <strong>${tpl.title}</strong>
          <span class="template-stars">★★★★★</span>
        </div>
        <p class="template-text">"${tpl.content}"</p>
      </div>
      <button class="btn btn-sm btn-outline btn-use-template">
        <i class="fa-solid fa-copy"></i> Sử Dụng Mẫu Này
      </button>
    `;

    card.querySelector('.btn-use-template').addEventListener('click', () => {
      commentInput.value = tpl.content;
      commentInput.dispatchEvent(new Event('input'));
      
      // Switch to single tab
      document.querySelector('[data-tab="tabSingle"]').click();
      log(`[Template] Đã áp dụng mẫu: "${tpl.title}" vào ô đánh giá đơn.`, 'info');
    });

    templatesGrid.appendChild(card);
  });

  // Load sample row initially
  btnLoadSampleBatch.click();
});
