import type { APIRoute } from 'astro';

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    console.log(file)
    if (!file || !(file instanceof File)) {
      return new Response(JSON.stringify({ error: 'No file uploaded' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Forward the file to the Go backend
    const proxyFormData = new FormData();
    proxyFormData.append('file', file);

    const resp = await fetch('https://golangbackend.onrender.com/upload', {
      method: 'POST',
      body: proxyFormData,
      headers: {
        'Accept': 'application/json', // Expect JSON response
      }
    });

    const data = await resp.text();
    if (!resp.ok) {
        console.log('Error response from Go backend:', data);
        
      return new Response(data, {
        status: resp.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(data, {
      status: resp.status,
      headers: { 'Content-Type': resp.headers.get('Content-Type') || 'application/json' },
    });
  } catch (err) {
    console.error('Error in upload API:', err);
    return new Response(JSON.stringify({ error: 'Proxy error', details: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
