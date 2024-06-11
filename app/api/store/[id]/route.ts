import { API_TOKO, HEADERS } from '@/config/kadobu-api';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const response = await fetch(`${API_TOKO}/${params.id}`, {
    headers: HEADERS,
    cache: 'no-cache',
  });
  const res = await response.json();
  const status = response.ok ? 200 : 400;

  return NextResponse.json({ ...res }, { status });
}
