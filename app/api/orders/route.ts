import { API_ORDER, HEADERS } from '@/config/kadobu-api';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();
  const { userId } = auth();

  const response = await fetch(`${API_ORDER}`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({ idPembeli: userId, ...data }),
  });
  const res = await response.json();
  const status = response.ok ? 200 : 400;
  return NextResponse.json({ ...res }, { status });
}
export async function GET(request: Request) {
  const { userId } = auth();
  const { searchParams } = new URL(request.url);
  const status_pesanan = searchParams.get('status');
  let response: any;
  if (status_pesanan) {
    response = await fetch(
      `${API_ORDER}?userId=${userId}&status=${status_pesanan}`,
      {
        headers: HEADERS,
        cache: 'default',
      },
    );
  } else {
    response = await fetch(`${API_ORDER}?userId=${userId}`, {
      headers: HEADERS,
      cache: 'default',
    });
  }

  const res = await response.json();
  const status = response.ok ? 200 : 400;
  return NextResponse.json({ ...res }, { status });
}
