"use client"
import { useQuery } from '@tanstack/react-query'
import { getCourses } from '../services/course.service'

export function useCourses() {
  return useQuery({
    queryKey: ['courses'],
    queryFn: getCourses,
    
  })
}
