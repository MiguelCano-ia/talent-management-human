import axios from "axios"
import { CreateUserInput } from "../interfaces/user.interface"

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})

export const createUser = async (data: CreateUserInput) => {
  const response = await API.post("/api/v1/user", data)
  return response.data
}
