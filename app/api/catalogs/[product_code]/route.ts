import { API_KATALOG, API_KEY, HEADERS } from '@/config/kadobu-api';

export async function GET(
  request: Request,
  { params }: { params: { product_code: string } },
) {
  const res = await fetch(`${API_KATALOG}/${params.product_code}`, {
    headers: HEADERS,
    cache: 'no-cache',
  });
  const data = await res.json();
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}
