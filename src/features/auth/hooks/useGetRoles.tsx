import { useQuery } from "@tanstack/react-query";
import { getUsersRoles } from "../services/auth.service";
import { AxiosError } from "axios";
import { UserRole } from "../interfaces/user.interface";

export const useGetRoles = () => {
  return useQuery<UserRole[], AxiosError>({
    queryKey: ["roles"],
    queryFn: getUsersRoles,
    refetchOnWindowFocus: false
  });
};