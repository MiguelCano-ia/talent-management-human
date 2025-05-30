"use client"
import { useQuery } from '@tanstack/react-query'
import { getCourseByCookieUser } from '../services/course.service'

export function useUserCourses() {
  return useQuery({
    queryKey: ['courses'],
    queryFn: getCourseByCookieUser,
    
  })
}
