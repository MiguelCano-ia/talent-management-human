'use server'

import { API } from '@/config/api'
import { MeansOfPayment } from '../validations/means-of-payment.validations'

export const getMeansOfPayments = async (): Promise<MeansOfPayment[]> => {
  const res = await API.get('generic/meansOfPayment')
  return res.data
}

export const createMeansOfPayment = async (data: {
  meansOfPayment: string
}) => {
  const res = await API.post('generic/meansOfPayment', data)
  return res.data
}

export const updateMeansOfPayment = async (
  id: number,
  data: { meansOfPayment: string }
) => {
  const res = await API.put(`generic/meansOfPayment/${id}`, data)
  return res.data
}
