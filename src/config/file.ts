"use server"

import axios from "axios"
import { cookies } from "next/headers"

export const APIAuthFile = axios.create({
  baseURL: process.env.API_URL || "http://localhost:3000/api/v1/",
  withCredentials: true,
})

APIAuthFile.interceptors.request.use(async (config) => {
  const token = (await cookies()).get("Authorization")?.value
  if (token) {
    config.headers.set('cookie', `Authorization=${token}`)
  }
  return config
})