// Staff Assignment data Default (CSKH vs Kỹ Thuật)
const staffCSKHDefault = [
  { "staffName": "Cao Hương", "fromStt": 1, "toStt": 19, "count": 19 },
  { "staffName": "Quỳnh Hương", "fromStt": 20, "toStt": 38, "count": 19 },
  { "staffName": "Quỳnh Như", "fromStt": 39, "toStt": 56, "count": 18 },
  { "staffName": "Thu Trang", "fromStt": 57, "toStt": 74, "count": 18 },
  { "staffName": "Thị Thu", "fromStt": 75, "toStt": 92, "count": 18 },
  { "staffName": "Lan Anh", "fromStt": 93, "toStt": 110, "count": 18 },
  { "staffName": "Nguyễn Quỳnh", "fromStt": 111, "toStt": 128, "count": 18 }
];

const staffKyThuatDefault = [
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

const phonePrefixes = [
  "098", "097", "096", "086", "032", "033", "034", "035", "036", "037", "038", "039",
  "091", "094", "088", "083", "084", "085", "081", "082",
  "090", "093", "089", "070", "079", "077", "076", "078"
];

function getRandomPhone() {
  const getRandomItem = arr => arr[Math.floor(Math.random() * arr.length)];
  const prefix = getRandomItem(phonePrefixes);
  const suffix = Math.floor(1000000 + Math.random() * 9000000).toString();
  return `${prefix}${suffix}`;
}

const sampleReviewerNames = Array.from({ length: 300 }, () => getRandomVietnameseName());

document.addEventListener('DOMContentLoaded', async () => {
  const btnGlobalAutoTemplate = document.getElementById('btnGlobalAutoTemplate');
  const btnDeptCSKH = document.getElementById('btnDeptCSKH');
  const btnDeptKyThuat = document.getElementById('btnDeptKyThuat');

  const staffSelect = document.getElementById('staffSelect');
  const categorySelect = document.getElementById('categorySelect');
  const staffProductCountBadge = document.getElementById('staffProductCountBadge');
  const categoryProductCountBadge = document.getElementById('categoryProductCountBadge');

  const btnStartAutoPilotStaff = document.getElementById('btnStartAutoPilotStaff');
  const btnStartAutoPilot = document.getElementById('btnStartAutoPilot');
  const btnStartAutoPilotAll = document.getElementById('btnStartAutoPilotAll');
  const btnStopAutoPilot = document.getElementById('btnStopAutoPilot');
  const btnRetryFailed = document.getElementById('btnRetryFailed');
  const failedCountBadge = document.getElementById('failedCountBadge');
  const quickStaffButtonsContainer = document.getElementById('quickStaffButtonsContainer');
  const autoPilotProgressSection = document.getElementById('autoPilotProgressSection');
  const autoPilotProgressText = document.getElementById('autoPilotProgressText');
  const autoPilotProgressPercent = document.getElementById('autoPilotProgressPercent');
  const autoPilotProgressBarFill = document.getElementById('autoPilotProgressBarFill');
  const autoPilotCurrentItemText = document.getElementById('autoPilotCurrentItemText');

  const logTerminal = document.getElementById('logTerminal');
  const btnClearLog = document.getElementById('btnClearLog');

  let currentDept = localStorage.getItem('kuchen_selected_dept') || 'kythuat';
  let isAutoFillOn = false;
  let allProducts = [];
  let staffList = staffKyThuatDefault;
  let isAutoPilotRunning = false;
  let globalFailedProducts = [];

  function isRetryableStatus(status) {
    return status === 429 || status === 502 || status === 503 || status === 504 || status === 408 || status === 0;
  }

  async function submitReviewPayloadWithFeedback(payload) {
    const fields = {
      comment_post_ID: payload.pid,
      comment_parent: '0',
      submit: 'Gửi đánh giá ngay',
      author: payload.author,
      phone: payload.phone || '0334333777',
      email: payload.email || 'kuchenvietnam@gmail.com',
      rating: payload.rating || '5',
      comment: payload.comment
    };

    try {
      const fd = new FormData();
      for (let k in fields) fd.append(k, fields[k]);
      fd.append('product_url', payload.productUrl || 'https://kuchen.vn/');

      const res = await fetch('/api/proxy-submit', {
        method: 'POST',
        body: fd
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          return { success: true, status: json.status || 302, message: json.message || 'Server Kuchen phản hồi thành công', via: 'Server Proxy' };
        } else {
          return { success: false, status: json.status || 500, message: json.message || json.error || 'Server Kuchen báo lỗi', via: 'Server Proxy' };
        }
      } else {
        return { success: false, status: res.status, message: `Proxy Server trả về lỗi HTTP ${res.status}`, via: 'Server Proxy' };
      }
    } catch (e) {
      return { success: false, status: 0, message: `Lỗi kết nối mạng: ${e.message}`, via: 'Server Proxy' };
    }
  }

  async function runAutoPilotLoop(productList, scopeName, isManualRetry = false) {
    if (!productList || productList.length === 0) {
      alert('Không có sản phẩm nào trong danh sách!');
      return;
    }

    if (!isManualRetry) {
      const pass = prompt(`🔐 VUI LÒNG NHẬP MẬT KHẨU ĐỂ KÍCH HOẠT CHẾ ĐỘ AUTO-PILOT (${scopeName}):`);
      if (pass === null) return;

      try {
        const verifyRes = await fetch('/api/verify-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: pass })
        });
        const verifyJson = await verifyRes.json();
        if (!verifyJson.success) {
          alert('❌ Mật khẩu không chính xác! Không thể kích hoạt chế độ Auto-Pilot.');
          return;
        }
      } catch (e) {
        alert('❌ Lỗi kết nối tới Server!');
        return;
      }

      const confirmRun = confirm(`🚀 BẠN CÓ CHẮC CHẮN MUỐN BẮT ĐẦU CHẠY TỰ ĐỘNG CHO ${productList.length} SẢN PHẨM (${scopeName})?\n\nHệ thống sẽ tự động gửi đánh giá từng sản phẩm và cập nhật trực tiếp lên Dashboard chung!`);
      if (!confirmRun) return;
    }

    isAutoPilotRunning = true;
    if (btnStartAutoPilotStaff) btnStartAutoPilotStaff.style.display = 'none';
    if (btnStartAutoPilot) btnStartAutoPilot.style.display = 'none';
    if (btnStartAutoPilotAll) btnStartAutoPilotAll.style.display = 'none';
    if (btnRetryFailed) btnRetryFailed.style.display = 'none';
    btnStopAutoPilot.style.display = 'inline-flex';
    autoPilotProgressSection.style.display = 'block';

    let round1FailedItems = [];

    log(`[Auto-Pilot] 🚀 Bắt đầu Lượt 1 tiến trình chạy tự động ${productList.length} sản phẩm (${scopeName})...`, 'info');

    for (let i = 0; i < productList.length; i++) {
      if (!isAutoPilotRunning) break;

      const product = productList[i];
      const pid = product.productId || (product.stt === 4 || product.stt === 100 ? '9778' : product.stt);
      const randomName = getRandomVietnameseName();
      
      let reviewText = product.template1 || product.template2;
      if (product.template1 && product.template2) {
        reviewText = Math.random() > 0.5 ? product.template1 : product.template2;
      }
      if (!reviewText) {
        reviewText = 'Sản phẩm dùng rất êm và bền, chất lượng chuẩn Kuchen, giao hàng nhanh chóng.';
      }

      const pct = Math.round(((i + 1) / productList.length) * 100);
      autoPilotProgressBarFill.style.width = `${pct}%`;
      autoPilotProgressPercent.textContent = `${pct}%`;
      autoPilotProgressText.textContent = `Lượt 1: Đã xử lý ${i + 1}/${productList.length} sản phẩm (${scopeName})`;
      autoPilotCurrentItemText.textContent = `⚡ [STT ${product.stt}] [${product.category || 'Gia dụng'}] Đang gửi cho "${product.name}" (${product.assignee})...`;

      log(`[Auto-Pilot] [Lượt 1] [${i+1}/${productList.length}] Đang gửi SP STT ${product.stt} (ID: ${pid}) - "${randomName}"...`, 'info');

      const randomPhone = getRandomPhone();
      const result = await submitReviewPayloadWithFeedback({
        pid: pid,
        author: randomName,
        phone: randomPhone,
        email: 'kuchenvietnam@gmail.com',
        comment: reviewText,
        rating: '5',
        productUrl: product.url
      });

      if (result.success && (result.status === 302 || result.status === 200)) {
        recordCompletion(pid, {
          stt: product.stt,
          name: product.name,
          url: product.url,
          assignee: product.assignee,
          author: randomName,
          phone: randomPhone,
          comment: reviewText,
          rating: 5,
          statusCode: 302
        });
        log(`[Auto-Pilot] ✅ [Lượt 1] [${i+1}/${productList.length}] Thành công! (Code 302)`, 'success');
      } else {
        round1FailedItems.push(product);
        log(`[Auto-Pilot] ⚠️ [Lượt 1] [STT ${product.stt}] Gửi thất bại (Mã ${result.status}: ${result.message}). Đã thêm vào mảng thử lại Lượt 2.`, 'warning');
      }

      if (i < productList.length - 1 && isAutoPilotRunning) {
        const delaySec = Math.floor(Math.random() * 4) + 3;
        autoPilotCurrentItemText.textContent = `⏳ Chờ ${delaySec}s để chống Spam trước khi sang sản phẩm tiếp theo...`;
        await new Promise(r => setTimeout(r, delaySec * 1000));
      }
    }

    // --- LƯỢT 2 (RETRY ROUND FOR FAILED ITEMS) ---
    let finalFailedItems = [...round1FailedItems];

    if (round1FailedItems.length > 0 && isAutoPilotRunning) {
      log(`[Auto-Pilot] 📊 Lượt 1 hoàn tất! Thành công ${productList.length - round1FailedItems.length}/${productList.length}. Có ${round1FailedItems.length} sản phẩm thất bại (Mã 429/Timeout).`, 'warning');
      log(`[Auto-Pilot] ⏸️ Tạm dừng 30 giây để khôi phục Rate Limit Quota trước khi kích hoạt Lượt 2...`, 'info');

      for (let sec = 30; sec > 0; sec--) {
        if (!isAutoPilotRunning) break;
        autoPilotCurrentItemText.textContent = `⏳ [Nghỉ Cooldown Rate Limit] Tự động kích hoạt Lượt 2 sau ${sec} giây...`;
        await new Promise(r => setTimeout(r, 1000));
      }

      if (isAutoPilotRunning) {
        log(`[Auto-Pilot] 🔄 BẮT ĐẦU LƯỢT 2: Thử lại ${round1FailedItems.length} sản phẩm lỗi (Tăng giãn cách +2s)...`, 'info');
        finalFailedItems = [];

        for (let j = 0; j < round1FailedItems.length; j++) {
          if (!isAutoPilotRunning) break;

          const product = round1FailedItems[j];
          const pid = product.productId || (product.stt === 4 || product.stt === 100 ? '9778' : product.stt);
          const randomName = getRandomVietnameseName();
          
          let reviewText = product.template1 || product.template2;
          if (product.template1 && product.template2) {
            reviewText = Math.random() > 0.5 ? product.template1 : product.template2;
          }
          if (!reviewText) {
            reviewText = 'Sản phẩm dùng rất êm và bền, chất lượng chuẩn Kuchen, giao hàng nhanh chóng.';
          }

          const pct = Math.round(((j + 1) / round1FailedItems.length) * 100);
          autoPilotProgressBarFill.style.width = `${pct}%`;
          autoPilotProgressPercent.textContent = `${pct}%`;
          autoPilotProgressText.textContent = `Lượt 2 (Thử lại): Đã xử lý ${j + 1}/${round1FailedItems.length} sản phẩm lỗi`;
          autoPilotCurrentItemText.textContent = `🔄 [Lượt 2] [STT ${product.stt}] Đang thử lại cho "${product.name}"...`;

          log(`[Auto-Pilot] [Lượt 2] [${j+1}/${round1FailedItems.length}] Đang thử lại SP STT ${product.stt} (ID: ${pid})...`, 'info');

          const randomPhone = getRandomPhone();
          const result = await submitReviewPayloadWithFeedback({
            pid: pid,
            author: randomName,
            phone: randomPhone,
            email: 'kuchenvietnam@gmail.com',
            comment: reviewText,
            rating: '5',
            productUrl: product.url
          });

          if (result.success && (result.status === 302 || result.status === 200)) {
            recordCompletion(pid, {
              stt: product.stt,
              name: product.name,
              url: product.url,
              assignee: product.assignee,
              author: randomName,
              phone: randomPhone,
              comment: reviewText,
              rating: 5,
              statusCode: 302
            });
            log(`[Auto-Pilot] ✅ [Lượt 2] [STT ${product.stt}] THÀNH CÔNG RỒI! (Code 302)`, 'success');
          } else {
            finalFailedItems.push(product);
            log(`[Auto-Pilot] ❌ [Lượt 2] [STT ${product.stt}] Vẫn thất bại (Mã ${result.status}: ${result.message})`, 'error');
          }

          if (j < round1FailedItems.length - 1 && isAutoPilotRunning) {
            // Delay for Round 2: +2s extra delay per request
            const delaySec = Math.floor(Math.random() * 4) + 3 + 2; // 5s to 8s
            autoPilotCurrentItemText.textContent = `⏳ [Lượt 2] Chờ ${delaySec}s (+2s giãn cách Quota) trước sản phẩm tiếp theo...`;
            await new Promise(r => setTimeout(r, delaySec * 1000));
          }
        }
      }
    }

    globalFailedProducts = finalFailedItems;

    if (isAutoPilotRunning) {
      if (globalFailedProducts.length === 0) {
        log(`[Auto-Pilot] 🎉 ĐÃ HOÀN THÀNH TẤT CẢ SẢN PHẨM KHÔNG CÒN LỖI NÀO (${scopeName})!`, 'success');
        alert(`🎉 ĐÃ HOÀN THÀNH TỰ ĐỘNG TẤT CẢ SẢN PHẨM (${scopeName})!\n\nTiến độ đã được đồng bộ trực tiếp lên Dashboard.`);
      } else {
        log(`[Auto-Pilot] ⚠️ TIẾN TRÌNH HOÀN TẤT: Hoàn thành đa số, còn ${globalFailedProducts.length} sản phẩm thất bại sau 2 lượt. Bấm nút "🔄 CHẠY LẠI SẢN PHẨM LỖI" để thử lại thủ công.`, 'warning');
        alert(`⚠️ Hoàn tất tiến trình! Còn ${globalFailedProducts.length} sản phẩm bị lỗi.\n\nBạn có thể nhấn nút "🔄 CHẠY LẠI SẢN PHẨM LỖI" để thử lại thủ công bất kỳ lúc nào.`);
      }
    }
    
    stopAutoPilot();
  }

  if (btnStartAutoPilotStaff) {
    btnStartAutoPilotStaff.addEventListener('click', () => {
      const selectedStaff = staffSelect ? staffSelect.value : 'ALL';
      if (selectedStaff === 'ALL') {
        alert('Vui lòng chọn 1 người phụ trách cụ thể trong danh sách hoặc bấm nút chạy nhanh theo từng người!');
        return;
      }
      const staffProducts = allProducts.filter(p => p.assignee === selectedStaff);
      runAutoPilotLoop(staffProducts, `Nhân Viên: ${selectedStaff}`);
    });
  }

  if (btnStartAutoPilot) {
    btnStartAutoPilot.addEventListener('click', () => {
      const selectedCat = categorySelect ? categorySelect.value : 'ALL';
      if (selectedCat === 'ALL') {
        alert('Vui lòng chọn 1 danh mục cụ thể trong ô "Chọn Danh Mục Sản Phẩm Để Chạy"!');
        return;
      }
      const catProducts = allProducts.filter(p => (p.category || 'Chưa phân loại') === selectedCat);
      runAutoPilotLoop(catProducts, `Danh Mục: ${selectedCat}`);
    });
  }

  if (btnStartAutoPilotAll) {
    btnStartAutoPilotAll.addEventListener('click', () => {
      runAutoPilotLoop(allProducts, 'Toàn bộ 128 Sản Phẩm');
    });
  }

  if (btnRetryFailed) {
    btnRetryFailed.addEventListener('click', () => {
      if (!globalFailedProducts || globalFailedProducts.length === 0) {
        alert('Hiện không có sản phẩm nào bị lỗi!');
        return;
      }
      runAutoPilotLoop(globalFailedProducts, `Chạy lại ${globalFailedProducts.length} SP Lỗi`, true);
    });
  }

  if (btnStopAutoPilot) {
    btnStopAutoPilot.addEventListener('click', () => {
      log('[Auto-Pilot] ⏹️ Đã dừng tiến trình chạy tự động.', 'warning');
      stopAutoPilot();
    });
  }

  function stopAutoPilot() {
    isAutoPilotRunning = false;
    if (btnStartAutoPilotStaff) btnStartAutoPilotStaff.style.display = 'inline-flex';
    if (btnStartAutoPilot) btnStartAutoPilot.style.display = 'inline-flex';
    if (btnStartAutoPilotAll) btnStartAutoPilotAll.style.display = 'inline-flex';
    if (btnStopAutoPilot) btnStopAutoPilot.style.display = 'none';

    if (btnRetryFailed) {
      if (globalFailedProducts && globalFailedProducts.length > 0) {
        btnRetryFailed.style.display = 'inline-flex';
        if (failedCountBadge) failedCountBadge.textContent = globalFailedProducts.length;
      } else {
        btnRetryFailed.style.display = 'none';
      }
    }
  }

  function log(msg, type = 'info') {
    if (!logTerminal) return;
    const time = new Date().toLocaleTimeString();
    const line = document.createElement('div');
    line.className = `log-line ${type}`;
    line.textContent = `[${time}] ${msg}`;
    logTerminal.appendChild(line);
    logTerminal.scrollTop = logTerminal.scrollHeight;
  }

  function updateDeptButtons() {
    if (btnDeptCSKH && btnDeptKyThuat) {
      if (currentDept === 'cskh') {
        btnDeptCSKH.classList.add('active');
        btnDeptKyThuat.classList.remove('active');
      } else {
        btnDeptKyThuat.classList.add('active');
        btnDeptCSKH.classList.remove('active');
      }
    }
  }

  function updateGlobalAutoTemplateUI() {
    if (!btnGlobalAutoTemplate) return;
    if (isAutoFillOn) {
      btnGlobalAutoTemplate.classList.add('active-on');
      btnGlobalAutoTemplate.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> 💡 Tự Điền Mẫu 1: BẬT';
    } else {
      btnGlobalAutoTemplate.classList.remove('active-on');
      btnGlobalAutoTemplate.innerHTML = '<i class="fa-solid fa-lightbulb"></i> 💡 Tự Điền Mẫu 1: TẮT';
    }
  }

  async function fetchGlobalConfig() {
    try {
      const res = await fetch('/api/get-config');
      if (res.ok) {
        const json = await res.json();
        if (typeof json.autoFillTemplate1 === 'boolean') {
          isAutoFillOn = json.autoFillTemplate1;
          updateGlobalAutoTemplateUI();
        }
      }
    } catch (e) {}
  }

  if (btnGlobalAutoTemplate) {
    btnGlobalAutoTemplate.addEventListener('click', async () => {
      const pass = prompt('🔐 VUI LÒNG NHẬP MẬT KHẨU ADMIN ĐỂ BẬT/TẮT TỰ ĐIỀN MẪU 1 TOÀN HỆ THỐNG:');
      if (pass === null) return;

      const targetState = !isAutoFillOn;
      try {
        const res = await fetch('/api/toggle-config', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: pass, autoFillTemplate1: targetState })
        });
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.config) {
            isAutoFillOn = json.config.autoFillTemplate1;
            updateGlobalAutoTemplateUI();
            alert(`🎉 ĐÃ ${isAutoFillOn ? 'BẬT' : 'TẮT'} CHẾ ĐỘ TỰ ĐIỀN MẪU 1 THÀNH CÔNG CHO TOÀN HỆ THỐNG!`);
            log(`[System Config] Admin đã ${isAutoFillOn ? 'BẬT' : 'TẮT'} Tự Điền Mẫu 1 Toàn Hệ Thống.`, 'success');
          } else {
            alert('❌ Mật khẩu Admin không chính xác!');
          }
        }
      } catch (e) {
        alert('❌ Lỗi kết nối tới Server!');
      }
    });
  }

  async function loadDepartmentData(dept) {
    currentDept = dept;
    localStorage.setItem('kuchen_selected_dept', dept);
    updateDeptButtons();

    const pFile = dept === 'cskh' ? 'products_cskh.json' : 'products_kythuat.json';
    const sFile = dept === 'cskh' ? 'staff_cskh.json' : 'staff_kythuat.json';
    const fallbackStaff = dept === 'cskh' ? staffCSKHDefault : staffKyThuatDefault;

    try {
      const [pRes, sRes] = await Promise.all([fetch(pFile), fetch(sFile)]);
      if (pRes.ok) allProducts = await pRes.json();
      if (sRes.ok) staffList = await sRes.json(); else staffList = fallbackStaff;
    } catch (e) {
      staffList = fallbackStaff;
    }

    populateStaffDropdown(staffList);
    populateCategoryDropdown(allProducts);
    filterProducts();
  }

  function recordCompletion(productId, data) {
    const payload = {
      productId: productId,
      stt: data.stt || productId,
      name: data.name || 'Sản phẩm Kuchen',
      url: data.url || '',
      assignee: data.assignee || 'Người dùng',
      status: 'HOÀN THÀNH',
      statusClass: 'completed',
      reviewContent: data.comment,
      reviewerName: data.author,
      reviewerPhone: data.phone,
      rating: data.rating || 5,
      completedAt: new Date().toLocaleString('vi-VN')
    };

    try {
      const existing = JSON.parse(localStorage.getItem('kuchen_completed_reviews') || '{}');
      existing[productId] = payload;
      localStorage.setItem('kuchen_completed_reviews', JSON.stringify(existing));
    } catch (e) {}

    try {
      fetch('/api/update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => {});
    } catch (e) {}
  }

  async function submitReviewPayloadWithFeedback(payload) {
    const fields = {
      comment_post_ID: payload.pid,
      comment_parent: '0',
      submit: 'Gửi đánh giá ngay',
      author: payload.author,
      phone: payload.phone || '0334333777',
      email: payload.email || 'kuchenvietnam@gmail.com',
      rating: payload.rating || '5',
      comment: payload.comment
    };

    try {
      const fd = new FormData();
      for (let k in fields) fd.append(k, fields[k]);
      fd.append('product_url', payload.productUrl || 'https://kuchen.vn/');

      const res = await fetch('/api/proxy-submit', {
        method: 'POST',
        body: fd
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          return { success: true, status: json.status || 302, message: json.message || 'Server Kuchen phản hồi thành công', via: 'Server Proxy' };
        } else {
          return { success: false, status: json.status || 500, message: json.message || json.error || 'Server Kuchen báo lỗi', via: 'Server Proxy' };
        }
      }
    } catch (e) {}

    const tempForm = document.createElement('form');
    tempForm.action = 'https://kuchen.vn/wp-comments-post.php';
    tempForm.method = 'POST';
    tempForm.target = 'hidden_submit_iframe';

    for (let key in fields) {
      const inp = document.createElement('input');
      inp.type = 'hidden';
      inp.name = key;
      inp.value = fields[key];
      tempForm.appendChild(inp);
    }

    document.body.appendChild(tempForm);
    HTMLFormElement.prototype.submit.call(tempForm);

    setTimeout(() => {
      if (document.body.contains(tempForm)) {
        document.body.removeChild(tempForm);
      }
    }, 500);

    return { success: true, status: 200, message: 'Đã phát request trực tiếp tới Kuchen.vn', via: 'Direct Iframe' };
  }

  if (btnClearLog) {
    btnClearLog.addEventListener('click', () => { if (logTerminal) logTerminal.innerHTML = ''; });
  }

  await fetchGlobalConfig();
  await loadDepartmentData(currentDept);
  setInterval(fetchGlobalConfig, 5000);

  if (btnDeptCSKH) btnDeptCSKH.addEventListener('click', () => loadDepartmentData('cskh'));
  if (btnDeptKyThuat) btnDeptKyThuat.addEventListener('click', () => loadDepartmentData('kythuat'));

  function populateStaffDropdown(sList) {
    const deptTitle = currentDept === 'cskh' ? 'CSKH' : 'Kỹ Thuật';
    staffSelect.innerHTML = `<option value="ALL">-- Tất cả người phụ trách ${deptTitle} (${allProducts.length} SP) --</option>`;
    sList.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s.staffName;
      opt.textContent = `👤 ${deptTitle}: ${s.staffName} (${s.count} SP)`;
      staffSelect.appendChild(opt);
    });

    renderQuickStaffButtons(sList);
  }

  function renderQuickStaffButtons(sList) {
    if (!quickStaffButtonsContainer) return;
    quickStaffButtonsContainer.innerHTML = '';

    sList.forEach(s => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn-quick-staff';
      btn.style.cssText = `
        padding: 8px 14px;
        background: var(--card-bg);
        border: 1px solid var(--card-border);
        border-radius: var(--radius-md);
        font-size: 12.5px;
        font-weight: 700;
        color: var(--text-main);
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        transition: all 0.2s ease;
      `;
      btn.innerHTML = `<i class="fa-solid fa-user-check" style="color:var(--primary);"></i> ${s.staffName} <span style="font-size:11px; opacity:0.75; color:var(--text-muted);">(${s.count} SP)</span>`;

      btn.addEventListener('click', () => {
        if (staffSelect) staffSelect.value = s.staffName;
        if (categorySelect) categorySelect.value = 'ALL';
        filterProducts();

        const staffProducts = allProducts.filter(p => p.assignee === s.staffName);
        runAutoPilotLoop(staffProducts, `Nhân Viên: ${s.staffName}`);
      });

      quickStaffButtonsContainer.appendChild(btn);
    });
  }

  function populateCategoryDropdown(products) {
    if (!categorySelect) return;
    categorySelect.innerHTML = '';
    
    const categoryCounts = {};
    products.forEach(p => {
      const cat = p.category || 'Chưa phân loại';
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });

    const catList = Object.keys(categoryCounts);
    const defaultOpt = document.createElement('option');
    defaultOpt.value = 'ALL';
    defaultOpt.textContent = `-- Tất cả danh mục (${catList.length} danh mục / ${products.length} SP) --`;
    categorySelect.appendChild(defaultOpt);

    catList.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = `📁 ${cat} (${categoryCounts[cat]} SP)`;
      categorySelect.appendChild(opt);
    });
  }

  if (staffSelect) staffSelect.addEventListener('change', () => filterProducts());
  if (categorySelect) categorySelect.addEventListener('change', () => filterProducts());

  function filterProducts() {
    const selectedStaff = staffSelect ? staffSelect.value : 'ALL';
    const selectedCat = categorySelect ? categorySelect.value : 'ALL';

    let filtered = allProducts;
    if (selectedStaff !== 'ALL') filtered = filtered.filter(p => p.assignee === selectedStaff);
    if (selectedCat !== 'ALL') filtered = filtered.filter(p => (p.category || 'Chưa phân loại') === selectedCat);

    if (staffProductCountBadge) {
      staffProductCountBadge.textContent = selectedStaff !== 'ALL' ? `Phụ trách: ${selectedStaff}` : `Tất cả người phụ trách (${allProducts.length} SP)`;
    }

    if (categoryProductCountBadge) {
      categoryProductCountBadge.textContent = selectedCat !== 'ALL' ? `Danh mục: ${selectedCat} (${filtered.length} SP)` : `Tất cả danh mục (${filtered.length} SP)`;
    }

    updateAutoPilotUI(selectedCat, selectedStaff, filtered.length);
    log(`[Cấu Hình Bộ Lọc] Tìm thấy ${filtered.length} sản phẩm phù hợp (Nhân viên: "${selectedStaff}", Danh mục: "${selectedCat}").`, 'info');
  }

  function updateAutoPilotUI(selectedCat, selectedStaff, count) {
    if (btnStartAutoPilot) {
      if (selectedCat !== 'ALL') {
        btnStartAutoPilot.innerHTML = `<i class="fa-solid fa-layer-group"></i> 📁 CHẠY DANH MỤC "${selectedCat}" (${count} SP)`;
      } else {
        btnStartAutoPilot.innerHTML = `<i class="fa-solid fa-layer-group"></i> 📁 CHẠY THEO DANH MỤC`;
      }
    }

    if (btnStartAutoPilotStaff) {
      if (selectedStaff !== 'ALL') {
        btnStartAutoPilotStaff.innerHTML = `<i class="fa-solid fa-user-gear"></i> 👤 CHẠY CHO "${selectedStaff}" (${count} SP)`;
      } else {
        btnStartAutoPilotStaff.innerHTML = `<i class="fa-solid fa-user-gear"></i> 👤 CHẠY THEO NGƯỜI PHỤ TRÁCH`;
      }
    }
  }

  // AUTO-PILOT EXECUTION
  async function runAutoPilotLoop(productList, scopeName) {
    if (!productList || productList.length === 0) {
      alert('Không có sản phẩm nào trong bộ lọc để chạy!');
      return;
    }

    const pass = prompt(`🔐 VUI LÒNG NHẬP MẬT KHẨU ĐỂ KÍCH HOẠT CHẾ ĐỘ AUTO-PILOT (${scopeName}):`);
    if (pass === null) return;

    try {
      const verifyRes = await fetch('/api/verify-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pass })
      });
      const verifyJson = await verifyRes.json();
      if (!verifyJson.success) {
        alert('❌ Mật khẩu không chính xác! Không thể kích hoạt chế độ Auto-Pilot.');
        return;
      }
    } catch (e) {
      alert('❌ Lỗi kết nối tới Server!');
      return;
    }

    const confirmRun = confirm(`🚀 BẠN CÓ CHẮC CHẮN MUỐN BẮT ĐẦU CHẠY TỰ ĐỘNG CHO ${productList.length} SẢN PHẨM (${scopeName})?\n\nHệ thống sẽ tự động gửi đánh giá từng sản phẩm và cập nhật trực tiếp lên Dashboard chung!`);
    if (!confirmRun) return;

    isAutoPilotRunning = true;
    btnStartAutoPilot.style.display = 'none';
    if (btnStartAutoPilotAll) btnStartAutoPilotAll.style.display = 'none';
    btnStopAutoPilot.style.display = 'inline-flex';
    autoPilotProgressSection.style.display = 'block';

    log(`[Auto-Pilot] 🚀 Bắt đầu tiến trình chạy tự động ${productList.length} sản phẩm (${scopeName})...`, 'info');

    for (let i = 0; i < productList.length; i++) {
      if (!isAutoPilotRunning) break;

      const product = productList[i];
      const pid = product.productId || (product.stt === 4 || product.stt === 100 ? '9778' : product.stt);
      const randomName = getRandomVietnameseName();
      
      let reviewText = product.template1 || product.template2;
      if (product.template1 && product.template2) {
        reviewText = Math.random() > 0.5 ? product.template1 : product.template2;
      }
      if (!reviewText) {
        reviewText = 'Sản phẩm dùng rất êm và bền, chất lượng chuẩn Kuchen, giao hàng nhanh chóng.';
      }

      const pct = Math.round(((i + 1) / productList.length) * 100);
      autoPilotProgressBarFill.style.width = `${pct}%`;
      autoPilotProgressPercent.textContent = `${pct}%`;
      autoPilotProgressText.textContent = `Đã xử lý ${i + 1}/${productList.length} sản phẩm (${scopeName})`;
      autoPilotCurrentItemText.textContent = `⚡ [STT ${product.stt}] [${product.category || 'Gia dụng'}] Đang gửi cho "${product.name}" (${product.assignee})...`;

      log(`[Auto-Pilot] [${i+1}/${productList.length}] Đang gửi cho SP STT ${product.stt} (ID: ${pid}) - "${randomName}"...`, 'info');

      const result = await submitReviewPayloadWithFeedback({
        pid: pid,
        author: randomName,
        phone: '0334333777',
        email: 'kuchenvietnam@gmail.com',
        comment: reviewText,
        rating: '5',
        productUrl: product.url
      });

      recordCompletion(pid, {
        stt: product.stt,
        name: product.name,
        url: product.url,
        assignee: product.assignee,
        author: randomName,
        phone: '0334333777',
        comment: reviewText,
        rating: 5
      });

      log(`[Auto-Pilot] ✅ [${i+1}/${productList.length}] Thành công! (Code ${result.status})`, 'success');

      if (i < productList.length - 1 && isAutoPilotRunning) {
        const delaySec = Math.floor(Math.random() * 4) + 3;
        autoPilotCurrentItemText.textContent = `⏳ Chờ ${delaySec}s để chống Spam trước khi sang sản phẩm tiếp theo...`;
        await new Promise(r => setTimeout(r, delaySec * 1000));
      }
    }

    if (isAutoPilotRunning) {
      log(`[Auto-Pilot] 🎉 ĐÃ HOÀN THÀNH TỰ ĐỘNG ${productList.length} SẢN PHẨM (${scopeName})! Trạng thái đã nhảy xanh trên Dashboard.`, 'success');
      alert(`🎉 ĐÃ HOÀN THÀNH TỰ ĐỘNG ${productList.length} SẢN PHẨM (${scopeName})!\n\nTiến độ đã được đồng bộ trực tiếp lên Dashboard.`);
    }
    
    stopAutoPilot();
  }

  if (btnStartAutoPilotStaff) {
    btnStartAutoPilotStaff.addEventListener('click', () => {
      const selectedStaff = staffSelect ? staffSelect.value : 'ALL';
      if (selectedStaff === 'ALL') {
        alert('Vui lòng chọn 1 người phụ trách cụ thể trong danh sách hoặc bấm nút chạy nhanh theo từng người!');
        return;
      }
      const staffProducts = allProducts.filter(p => p.assignee === selectedStaff);
      runAutoPilotLoop(staffProducts, `Nhân Viên: ${selectedStaff}`);
    });
  }

  if (btnStartAutoPilot) {
    btnStartAutoPilot.addEventListener('click', () => {
      const selectedCat = categorySelect ? categorySelect.value : 'ALL';
      if (selectedCat === 'ALL') {
        alert('Vui lòng chọn 1 danh mục cụ thể trong ô "Chọn Danh Mục Sản Phẩm Để Chạy"!');
        return;
      }
      const catProducts = allProducts.filter(p => (p.category || 'Chưa phân loại') === selectedCat);
      runAutoPilotLoop(catProducts, `Danh Mục: ${selectedCat}`);
    });
  }

  if (btnStartAutoPilotAll) {
    btnStartAutoPilotAll.addEventListener('click', () => {
      runAutoPilotLoop(allProducts, 'Toàn bộ 128 Sản Phẩm');
    });
  }

  if (btnStopAutoPilot) {
    btnStopAutoPilot.addEventListener('click', () => {
      log('[Auto-Pilot] ⏹️ Đã dừng tiến trình chạy tự động.', 'warning');
      stopAutoPilot();
    });
  }

  function stopAutoPilot() {
    isAutoPilotRunning = false;
    if (btnStartAutoPilotStaff) btnStartAutoPilotStaff.style.display = 'inline-flex';
    if (btnStartAutoPilot) btnStartAutoPilot.style.display = 'inline-flex';
    if (btnStartAutoPilotAll) btnStartAutoPilotAll.style.display = 'inline-flex';
    if (btnStopAutoPilot) btnStopAutoPilot.style.display = 'none';
  }
});
