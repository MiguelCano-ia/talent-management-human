import { NextRequest, NextResponse } from 'next/server';
import { GoogleAuthService } from './service';
import { cookies } from 'next/headers';

const googleAuthService = new GoogleAuthService();

export async function GET(request: NextRequest, response: NextResponse) {
    const data = await googleAuthService.getToken(request);
    const cookieStore = await cookies();
    cookieStore.set("Authorization", data);
    return NextResponse.redirect(new URL('/dashboard', request.url));
}