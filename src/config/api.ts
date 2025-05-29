import axios from "axios"

export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})