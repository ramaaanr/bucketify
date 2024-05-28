export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const product_code = searchParams.get('product_code');
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/katalogs/`, {
    cache: 'no-cache',
  });
  const data = await res.json();
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}
