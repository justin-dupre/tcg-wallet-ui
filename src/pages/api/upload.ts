import type { APIRoute } from 'astro';

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
  const backendUrl = 'http://127.0.0.1:8000/api/image/analyze-image';
  const body = request.body;
  console.log(body);

  const headers = new Headers(request.headers);
  // Remove host header to avoid issues with CORS/proxy
  headers.delete('host');
  // Remove content-length to let fetch recalculate it if needed
  headers.delete('content-length');

  const response = await fetch(backendUrl, {
    method: 'POST',
    headers,
    body,
    duplex: 'half',
  } as RequestInit);

  const contentType = response.headers.get('content-type') || '';
  let result;
  let resultContentType = 'application/json';
  try {
    if (contentType.includes('application/json')) {
      result = await response.json();
    } else if (contentType.startsWith('text/')) {
      const text = await response.text();
      result = { message: text };
    } else {
      // For binary or unknown types, return as base64
      const buffer = await response.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      result = { base64 };
    }
  } catch (e) {
    result = { error: 'Failed to parse backend response' };
  }

  return new Response(JSON.stringify(result), {
    status: response.status,
    headers: {
      'content-type': resultContentType,
    },
  });
};
