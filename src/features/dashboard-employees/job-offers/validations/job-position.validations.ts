import { z } from "zod";

export const jobPositionSchema = z.object({
  jobPositionId: z.number(),
  jpbPosition: z.string(),
});

export type JobPosition = z.infer<typeof jobPositionSchema>;
