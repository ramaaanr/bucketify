import { API_WISHLIST, HEADERS } from '@/config/kadobu-api';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function DELETE(
  request: Request,

  { params }: { params: { id: string } },
) {
  const { userId } = auth();

  const response = await fetch(`${API_WISHLIST}/${params.id}`, {
    headers: HEADERS,
    cache: 'default',
    method: 'DELETE',
  });

  const res = await response.json();
  const status = response.ok ? 200 : 400;
  return NextResponse.json({ ...res }, { status });
}
