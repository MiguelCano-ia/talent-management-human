"use server"

import { API } from "@/config/api"
import { Company } from "../validations/compay.validation"

export const getCompanies = async (): Promise<Company[]> => {
    const res = await API.get("generic/companies")
    return res.data
}

export const addCompany = async (data: Company) => {
    const res = await API.post("generic/company", data);
    return res.data
}

export const deleteCompany = async (companyId: string) => {
    const res = await API.delete(`generic/company/${companyId}`);
    return res.data;
}