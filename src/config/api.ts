import axios from "axios"

export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const response = error.response;
    if(response && response.status === 401) {
      console.log("Unauthorized access - redirecting to login")
    }
    return Promise.reject(error)
  }
)