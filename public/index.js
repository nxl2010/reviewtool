export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Proxy endpoint to bypass Cross-Origin WAF blocking on kuchen.vn
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
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
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
