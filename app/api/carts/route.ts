import { API_CART, HEADERS } from '@/config/kadobu-api';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();
  const { userId } = auth();
  const payload = {
    ...data,
    idPembeli: userId,
  };

  const response = await fetch(`${API_CART}`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(payload),
  });

  const res = await response.json();
  const status = response.ok ? 200 : 400;
  return NextResponse.json({ ...res }, { status });
}
export async function GET(request: Request) {
  const { userId } = auth();
  const response = await fetch(`${API_CART}?id_pembeli=${userId}`, {
    headers: HEADERS,
  });
  const res = await response.json();
  const status = response.ok ? 200 : 400;
  return NextResponse.json({ ...res }, { status });
}
