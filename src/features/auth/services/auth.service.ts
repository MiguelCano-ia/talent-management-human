import axios from "axios";
import { CreateUserInput, UserRole } from "../interfaces/user.interface";
import { LoginInput } from "../validations/login.validations";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://turbo-dollop-w6gr66rp5jqh54j6-3000.app.github.dev/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const createUser = async (data: CreateUserInput) => {
  const response = await API.post("user", data);
  return response.data;
};

export const login = async (data: LoginInput) => {
  const response = await API.post("auth/login", data);
  return response.data;
};

export const getUsersRoles = async (): Promise<UserRole[]> => {
  const response = await API.get("user/roles");
  return [{ roleId: 1, role: "admin" }];
};
