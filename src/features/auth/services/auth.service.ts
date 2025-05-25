"use server"

import axios from "axios";
import { CreateUserInput, UserRole } from "../interfaces/user.interface";
import { LoginInput } from "../validations/login.validations";
import { BranchOfOffice } from "../interfaces/branchOfOffice.interface";
import { MeansOfPayment } from "../interfaces/meansOfPayment.interface";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1/",
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
  return response.data;
};

export const getBranchOfOffices = async (): Promise<BranchOfOffice[]> => {
  return (await API.get("generic/branchOfOffice")).data;
}

export const getMeansOfPayments = async (): Promise<MeansOfPayment[]> => {
  return (await API.get("generic/meansOfPayment")).data;
}