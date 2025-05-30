import { API } from "@/config/api";
import { Habilities } from "../validations/validations.service";

export const getHabilities = async (): Promise<Habilities[]> => {
    try {
        const response = await API.get("/education/habilities");
        return response.data;
    } catch (error) {
        console.error("Error fetching habilities:", error);
        throw error;
    }
}