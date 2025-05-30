import { API } from "@/config/api";
import { Course } from "../validations/validations.service";

export const getCourses = async (): Promise<Course[]> => {
    try {
        const response = await API.get("/education/courses");
        return response.data;
    } catch (error) {
        console.error("Error fetching courses:", error);
        throw error;
    }
}

export const postCourse = async (course: Course): Promise<string> => {
    try {
        const response = await API.post("/education/courses", course);
        return response.data;
    } catch (error) {
        console.error("Error posting course:", error);
        throw error;
    }
};

export const getCourseByCookieUser = async (): Promise<Course[]> => {
    try {
        const response = await API.get("/education/courses/userId");
        return response.data;
    } catch (error) {
        console.error("Error fetching course by cookie user:", error);
        throw error;
    }
}

export const getCouseByUserId = async (userId: string): Promise<Course[]> => {
    try {
        const response = await API.get(`/education/courses/userId/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching course by user ID:", error);
        throw error;
    }
}