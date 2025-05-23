import { useQuery } from "@tanstack/react-query";
import { getMeansOfPayments } from "../services/auth.service";
import { AxiosError } from "axios";
import { MeansOfPayment } from "../interfaces/meansOfPayment.interface";

export const useGetMeansOfPayments = () => {
    return useQuery<MeansOfPayment[], AxiosError>({
        queryKey: ["MeansOfPayments"],
        queryFn: getMeansOfPayments,
        refetchOnWindowFocus: false
    });
};