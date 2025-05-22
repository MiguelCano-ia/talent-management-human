import { useMutation } from "@tanstack/react-query";
import { getUsersRoles } from "../services/auth.service";
import { AxiosError } from "axios";

export const useGetRoles = () => {
  return useMutation({
    mutationFn: getUsersRoles,
    onError: (err: AxiosError) => {
      console.error("Error al obtener los roles: " + err);
    },
  });
};
