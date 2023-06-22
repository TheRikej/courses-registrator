import { CourseModel, AddSemesterCourseData, CourseModelUndefined, CourseCreateModel, CourseAll, CourseSpecific } from "../models";
import axiosInstance from "../base";
import { ResponseMulti, ResponseSingle } from "../responses";

export const getCourses = async (): Promise<ResponseMulti<CourseAll>> => {
    const response = await axiosInstance.get('/course');
    return response.data;
}

export const createCourse = async (courseData: CourseCreateModel): Promise<ResponseSingle<CourseModel>> => {
    const response = await axiosInstance.post(`/course`, {
        ...courseData
     });
    return response.data;
}

export const updateCourse = async (courseData: CourseModelUndefined): Promise<ResponseSingle<CourseModel>> => {
    const response = await axiosInstance.put(`/course/${courseData.id}`, {
        ...courseData
     });
    return response.data;
}

export const getCourse = async (id: string): Promise<ResponseSingle<CourseSpecific>> => {
    const response = await axiosInstance.get(`/course/${id}`);
    return response.data;
}

export const addCourseSemester = async ( id: string, data: AddSemesterCourseData ): Promise<ResponseSingle<CourseModel>> => {
    const response = await axiosInstance.post(`/course/${id}/courseSemester`, {
        ...data
     });
    return response.data;
}

export const deleteCourse = async (id: string): Promise<ResponseSingle<CourseModel>> => {
    const response = await axiosInstance.delete(`/course/${id}`);
    return response.data;
}