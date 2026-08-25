// In-memory global completion store for all staff members
let globalCompletedReviews = {};

// In-memory global system configuration
let globalConfig = {
  autoFillTemplate1: false
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Handle CORS Preflight OPTIONS
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }

    // 1. GET Global Completion Status for Dashboard
    if (url.pathname === '/api/get-status') {
      return new Response(JSON.stringify(globalCompletedReviews), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // 2. GET System-Wide Configuration
    if (url.pathname === '/api/get-config') {
      return new Response(JSON.stringify(globalConfig), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // 3. POST Toggle System-Wide Configuration (Admin Password: nxl2010@)
    if (url.pathname === '/api/toggle-config' && request.method === 'POST') {
      try {
        const body = await request.json();
        if (body && body.password === 'nxl2010@') {
          if (typeof body.autoFillTemplate1 === 'boolean') {
            globalConfig.autoFillTemplate1 = body.autoFillTemplate1;
          } else {
            globalConfig.autoFillTemplate1 = !globalConfig.autoFillTemplate1;
          }
          return new Response(JSON.stringify({ success: true, config: globalConfig }), {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          });
        } else {
          return new Response(JSON.stringify({ success: false, message: 'Sai mật khẩu Admin!' }), {
            status: 403,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          });
        }
      } catch (e) {
        return new Response(JSON.stringify({ success: false, error: e.message }), { status: 400 });
      }
    }

    // 4. POST Record New Review Completion from any staff member
    if (url.pathname === '/api/update-status' && request.method === 'POST') {
      try {
        const body = await request.json();
        if (body && body.productId) {
          globalCompletedReviews[body.productId] = body;
        }
        return new Response(JSON.stringify({ success: true, count: Object.keys(globalCompletedReviews).length }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      } catch (e) {
        return new Response(JSON.stringify({ success: false, error: e.message }), { status: 400 });
      }
    }

    // 5. POST Reset Global Status (Password: nxl2010@)
    if (url.pathname === '/api/reset-status' && request.method === 'POST') {
      try {
        const body = await request.json();
        if (body && body.password === 'nxl2010@') {
          globalCompletedReviews = {};
          return new Response(JSON.stringify({ success: true, message: 'Đã Reset bảng đánh giá toàn bộ nhân viên!' }), {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          });
        } else {
          return new Response(JSON.stringify({ success: false, message: 'Sai mật khẩu xác nhận!' }), {
            status: 403,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          });
        }
      } catch (e) {
        return new Response(JSON.stringify({ success: false, error: e.message }), { status: 400 });
      }
    }

    // 6. Proxy endpoint to bypass Cross-Origin WAF blocking on kuchen.vn
    if (url.pathname === '/api/proxy-submit' && request.method === 'POST') {
      try {
        const formData = await request.formData();
        const targetUrl = 'https://kuchen.vn/wp-comments-post.php';

        const forwardHeaders = new Headers();
        forwardHeaders.set('Content-Type', 'application/x-www-form-urlencoded');
        forwardHeaders.set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
        forwardHeaders.set('Origin', 'https://kuchen.vn');
        
        const targetProductUrl = formData.get('product_url') || 'https://kuchen.vn/';
        forwardHeaders.set('Referer', targetProductUrl);

        const params = new URLSearchParams();
        for (const [key, value] of formData.entries()) {
          if (key !== 'product_url') {
            params.append(key, value);
          }
        }

        const res = await fetch(targetUrl, {
          method: 'POST',
          headers: forwardHeaders,
          body: params.toString(),
          redirect: 'manual'
        });

        const isSuccess = res.status === 302 || res.status === 200;

        return new Response(JSON.stringify({
          success: isSuccess,
          status: res.status,
          location: res.headers.get('location') || '',
          message: isSuccess ? 'Đã gửi đánh giá tới kuchen.vn thành công!' : `Mã phản hồi từ kuchen.vn: ${res.status}`
        }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      } catch (err) {
        return new Response(JSON.stringify({ success: false, error: err.message }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }
    }

    // Serve static assets from public folder
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response("Kuchen Review Tool Active");
  }
};
