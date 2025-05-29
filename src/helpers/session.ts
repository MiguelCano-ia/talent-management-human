"use server";

import { API } from "@/config/api"
import { cookies } from "next/headers"
import { User } from "./interfaces/user";

export const getUser = async (): Promise<User | null> => {
  const cookieStorage = await cookies()
  const token = cookieStorage.get("Authorization")?.value

  if (!token) {
    return null
  }

  try {
    const user = await API.get("user", { headers: { cookie: `Authorization=${token}` } });
    return user.data
  } catch (error) {
    await fetch("http://localhost:3000/v1/auth/logout");
    return null;
  }


}
