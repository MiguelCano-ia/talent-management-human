import { API } from "@/config/api";
import { JobPosition } from "../validations/job-position.validations";

export const getJobPositions = async (): Promise<JobPosition[]> => {
  const res = await API.get("paysheet/jobPosition");
  return res.data;
};
