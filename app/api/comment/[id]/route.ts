import { API_KOMEN, HEADERS } from '@/config/kadobu-api';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { userId } = auth();
    if (!userId)
      return NextResponse.json({ msg: 'not-allowed' }, { status: 400 });

    const response = await fetch(`${API_KOMEN}/${params.id}`, {
      method: 'DELETE',
      headers: HEADERS,
    });
    const res = await response.json();
    const status = response.ok ? 200 : 400;
    return NextResponse.json({ ...res }, { status });
  } catch (error: any) {
    return NextResponse.json({ msg: error.message }, { status: 500 });
  }
}
