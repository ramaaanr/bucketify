import { API_KOMEN, HEADERS } from '@/config/kadobu-api';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const kode_produk = searchParams.get('kode_produk');

  const response = await fetch(`${API_KOMEN}?kode_produk=${kode_produk}`, {
    method: 'GET',
    headers: HEADERS,
  });
  const res = await response.json();
  const status = response.ok ? 200 : 400;
  return NextResponse.json({ ...res }, { status });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { userId } = auth();
    if (!userId)
      return NextResponse.json({ msg: 'not-allowed' }, { status: 400 });

    const response = await fetch(`${API_KOMEN}`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(data),
    });
    const res = await response.json();
    const status = response.ok ? 200 : 400;
    return NextResponse.json({ ...res }, { status });
  } catch (error: any) {
    return NextResponse.json({ msg: error.message }, { status: 500 });
  }
}
