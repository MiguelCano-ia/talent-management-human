"use server";

import { API } from "@/config/api"
import { cookies } from "next/headers"
import { User } from "./interfaces/user";

export const getUser = async (): Promise<User | null> => {
  const token = (await cookies()).get("Authorization")?.value

  if (!token) {
    return null
  }

  const user = await API.get("user", { headers: { cookie: `Authorization=${token}` } });

  return user.data
}
