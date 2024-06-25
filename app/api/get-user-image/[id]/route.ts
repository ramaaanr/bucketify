import { clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,

  { params }: { params: { id: string } },
) {
  const { imageUrl } = await clerkClient.users.getUser(params.id);

  return NextResponse.json({ imageUrl }, { status: 200 });
}
