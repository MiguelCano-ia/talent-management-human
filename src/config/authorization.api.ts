"use server"

import axios from "axios"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const APIAuth = axios.create({
  baseURL: process.env.API_URL || "http://localhost:3001/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})

APIAuth.interceptors.request.use(async (config) => {
  const token = (await cookies()).get("Authorization")?.value
  if (token) {
    config.headers.set('cookie', `Authorization=${token}`)
  }
  return config
})

APIAuth.interceptors.response.use(
  (response) => response,
  (error) => {
    const response = error.response;
    if(response && response.status === 401) {
      console.log("Unauthorized access - redirecting to login")
      redirect("/auth/login");
    }
    return Promise.reject(error)
  }
)