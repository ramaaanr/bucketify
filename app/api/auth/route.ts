import { API_PENGGUNA } from '@/config/kadobu-api';
import { auth, currentUser } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { API_KEY } from '@/config/kadobu-api';

const headers = {
  'x-api-key': API_KEY || 'A1b2C3d4!E5f6G7@8',
  'Content-Type': 'application/json',
};
export async function GET(request: NextRequest) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Error: No signed in user' },
        { status: 401 },
      );
    }

    const user: any = await currentUser();
    const { id, username, emailAddresses } = user;
    const formData = {
      idPembeli: id,
      username,
      email: emailAddresses[0].emailAddress,
    };

    const resUserById = await fetch(`${API_PENGGUNA}/${id}`, {
      headers,
    });
    if (resUserById.ok) {
      return NextResponse.redirect(new URL('/catalogue', request.url));
    }

    const resPostUser = await fetch(`${API_PENGGUNA}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(formData), // Convert the formData object to a JSON string
    });

    if (!resPostUser.ok) {
      const resPost = await resPostUser.json();
      return NextResponse.json(
        {
          status: false,
          messsage: `Error: Fail to Signed to Database`,
          data: resPost,
        },
        { status: 400 },
      );
    }
    return NextResponse.redirect(new URL('/catalogue', request.url));
  } catch (error: any) {
    return NextResponse.json(
      { error: `Error: Internal Server Error, ${error.message}` },
      { status: 500 },
    );
  }
}
