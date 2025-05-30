import { z } from 'zod'

export const unpaymentShema = z.object({
  userId: z.number(),
  name: z.string(),
  account: z.string(),
  identificacion: z.string(),
  meansOfPaymentId: z.number(),
  salary: z.string(),
  contractId: z.number().optional(),
  payDay: z.array(z.number()),
  faults: z.array(z.object({
    "startDate": z.string(),
    "endDate": z.string(),
  })).optional(),
  novelties: z.array(z.object({
    "noveltyId": z.number(),
    "percentage": z.number(),
    "value": z.number(),
  })).optional(),
});

export type Unpayment = z.infer<typeof unpaymentShema>;