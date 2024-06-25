import { HEADERS, BASE_API } from '@/config/kadobu-api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const find_product = searchParams.get('cari');
  const category = searchParams.get('category');

  let res;
  try {
    if (find_product) {
      res = await fetch(`${BASE_API}/katalogs?cari=${find_product}`, {
        headers: HEADERS,
        cache: 'no-cache',
      });
    } else if (category) {
      res = await fetch(`${BASE_API}/katalogs?category=${category}`, {
        headers: HEADERS,
        cache: 'no-cache',
      });
    } else {
      res = await fetch(`${BASE_API}/katalogs`, {
        headers: HEADERS,
        cache: 'no-cache',
      });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!res.ok) {
    console.error('API response not ok:', res.statusText);
    return new Response(JSON.stringify({ error: 'API response not ok' }), {
      status: res.status,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const data = await res.json();
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}
