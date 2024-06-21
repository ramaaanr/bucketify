import { API_WISHLIST, HEADERS } from '@/config/kadobu-api';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();
  const { userId } = auth();
  const payload = {
    kodeProduk: data.kode_produk,
    idPembeli: userId,
  };
  const response = await fetch(`${API_WISHLIST}`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(payload),
  });
  const res = await response.json();
  const status = response.ok ? 200 : 400;
  return NextResponse.json({ ...res }, { status });
}
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const { userId } = auth();
  const kode_produk = searchParams.get('kode_produk');

  let response: any;
  if (kode_produk) {
    response = await fetch(
      `${API_WISHLIST}?id_pembeli=${userId}&kode_produk=${kode_produk}`,
      {
        headers: HEADERS,
        cache: 'default',
      },
    );
  } else {
    response = await fetch(`${API_WISHLIST}?id_pembeli=${userId}`, {
      headers: HEADERS,
      cache: 'default',
    });
  }
  const res = await response.json();
  const status = response.ok ? 200 : 400;
  return NextResponse.json({ ...res }, { status });
}
