"use client"
import { useQuery } from '@tanstack/react-query'
import { getHabilities } from '../services/habilities.service'

export function useHabilities() {
    return useQuery({
        queryKey: ['habilities'],
        queryFn: getHabilities,
    })
}
