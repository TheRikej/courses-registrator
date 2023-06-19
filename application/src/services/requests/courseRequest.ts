import { UserModel, CourseModel, AddSemesterCourseData } from "../models";
import axiosInstance from "../base";
import { ResponseMulti, ResponseSingle } from "../responses";
import type { CourseAll, CourseSpecific } from "../../../../back-end/src/repositories/course/types/result"

export const getCourses = async (): Promise<ResponseMulti<CourseAll>> => {
    const response = await axiosInstance.get('/course');
    return response.data;
}

export const createCourse = async (courseData: CourseModel): Promise<ResponseSingle<CourseModel>> => {
    const response = await axiosInstance.post(`/course`, {
        ...courseData
     });
    return response.data;
}

export const getCourse = async (id: string): Promise<ResponseSingle<CourseSpecific>> => {
    const response = await axiosInstance.get(`/course/${id}`);
    return response.data;
}

export const addCourseSemester = async ( id: string, data: AddSemesterCourseData ): Promise<ResponseSingle<CourseModel>> => {
    console.log(data)
    const response = await axiosInstance.post(`/course/${id}/courseSemester`, {
        ...data
     });
    return response.data;
}