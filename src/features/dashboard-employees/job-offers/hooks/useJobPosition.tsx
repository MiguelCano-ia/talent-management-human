import { useQuery } from "@tanstack/react-query";
import { getJobPositions } from "../services/job-position.service";

export function useJobPositions() {
  return useQuery({
    queryKey: ["job-positions"],
    queryFn: getJobPositions,
  });
}
