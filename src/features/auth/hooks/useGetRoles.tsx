import { useQuery } from "@tanstack/react-query"; // <-- Cambia a useQuery
import { getUsersRoles } from "../services/auth.service";
import { AxiosError } from "axios";
import { UserRole } from "../interfaces/user.interface";

export const useGetRoles = () => {
  return useQuery<UserRole[], AxiosError>({ // <-- Usa useQuery para GET
    queryKey: ["roles"], // Key única para el cacheado
    queryFn: getUsersRoles, // Función que ejecuta la petición
    refetchOnWindowFocus: false // Opcional: evita recargar al cambiar de ventana
  });
};