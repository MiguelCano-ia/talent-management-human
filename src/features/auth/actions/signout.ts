'use server'

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signout() {
  const cookieStore = await cookies()
  cookieStore.delete("Authorization")
  redirect("/auth/login")
}
