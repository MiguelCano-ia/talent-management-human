"use server";

import { API } from "@/config/api"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { User } from "./interfaces/user";

export const getUser = async (): Promise<User> => {
  const token = (await cookies()).get("Authorization")?.value

  if (!token) {
    return redirect("/auth/login")
  }

  const user = await API.get("user", { headers: { cookie: `Authorization=${token}` } });

  return user.data
}
