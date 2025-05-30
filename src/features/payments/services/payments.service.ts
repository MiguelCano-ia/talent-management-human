"use server"

import { Unpayment } from "../validations/unpayment.validations";
import { API } from "@/config/api";


export const getUnpayments = async (): Promise<Unpayment[]> => {
    const response = await API.get('paysheet/unPayments');
    if (!response.data) {
        return [];
    }
    return response.data;
}

export const getUnpaymentsByUserId = async (userId:number | null): Promise<Unpayment[]> => {
    if (!userId) 
        return [];
    const response = await API.get(`paysheet/unPayments/userId/${userId}`);
    if (!response.data) {
        return [];
    }
    return response.data;
}

export const postGeneratePayments = async (unpayments: string[]): Promise<Blob> => {
    const response = await API.post('paysheet/generatePayments', unpayments, {
        responseType: 'blob',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.data) {
        throw new Error('No data received from the server');
    }
    return response.data;
}