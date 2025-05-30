import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  cookieStore.delete("Authorization");
  return NextResponse.redirect(new URL("/auth/login", "http://localhost:3000"));
}