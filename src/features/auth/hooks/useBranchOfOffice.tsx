import { useQuery } from "@tanstack/react-query";
import { getBranchOfOffices } from "../services/auth.service";
import { AxiosError } from "axios";
import { BranchOfOffice } from "../interfaces/branchOfOffice.interface";

export const useGetBranchOfOffices = () => {
    return useQuery<BranchOfOffice[], AxiosError>({
        queryKey: ["brachOfOffices"],
        queryFn: getBranchOfOffices,
        refetchOnWindowFocus: false
    });
};