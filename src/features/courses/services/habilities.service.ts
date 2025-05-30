"use server"

import { Habilities } from "../validations/validations.service";
import { APIAuth } from "@/config/authorization.api";

export const getHabilities = async (): Promise<Habilities[]> => {
    try {
        const response = await APIAuth.get("education/habilities");
        return response.data;
    } catch (error) {
        console.error("Error fetching habilities:", error);
        throw error;
    }
}