import { useQuery } from "@tanstack/react-query";
import { getIdentificationTypes } from "../services/auth.service";
import { AxiosError } from "axios";
import { Identification } from "../interfaces/user.interface";

export const useGetIdentifications = () => {
    return useQuery<Identification[], AxiosError>({
        queryKey: ["identificationTypes"],
        queryFn: getIdentificationTypes,
        refetchOnWindowFocus: false
    });
};