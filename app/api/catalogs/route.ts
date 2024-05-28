export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const find_product = searchParams.get('cari');
  let res;
  if (find_product) {
    res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/katalogs?cari=${find_product}`,
      {
        cache: 'no-cache',
      },
    );
  } else {
    res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/katalogs`, {
      cache: 'no-cache',
    });
  }
  const data = await res.json();
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}
