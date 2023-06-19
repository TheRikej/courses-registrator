import { CourseSemesterModel } from "../models";
import axiosInstance from "../base";
import { ResponseMulti, ResponseSingle } from "../responses";
import type { CourseSpecific } from "../../../../back-end/src/repositories/courseSemester/types/result"

export const getCourseSemesters = async (): Promise<ResponseMulti<CourseSemesterModel>> => {
    const response = await axiosInstance.get('/courseSemester');
    return response.data;
}

export const getCourseSemester = async (id: string): Promise<ResponseSingle<CourseSpecific>> => {
    const response = await axiosInstance.get(`/courseSemester/${id}`);
    return response.data;
}