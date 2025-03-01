import { AddSemesterCourseData, CourseSemesterModel, CourseSemesterSpecific } from "../models";
import axiosInstance from "../base";
import { ResponseMulti, ResponseSingle } from "../responses";

export const getCourseSemesters = async (): Promise<ResponseMulti<CourseSemesterModel>> => {
    const response = await axiosInstance.get('/courseSemester');
    return response.data;
}

export const getCourseSemester = async (id: string): Promise<ResponseSingle<CourseSemesterSpecific>> => {
    const response = await axiosInstance.get(`/courseSemester/${id}`);
    return response.data;
}

export const addTeacherCourse = async (id: number, courseId: string): Promise<ResponseSingle<{id: string}>> => {
    const response = await axiosInstance.put(`/courseSemester/${courseId}/teacher/${id}`, {
        id,
        enrollCourseId: courseId,
    });
    return response.data;
}

export const removeTeacherCourse = async (id: number, courseId: string): Promise<ResponseSingle<{id: string}>> => {
    const response = await axiosInstance.delete(`/courseSemester/${courseId}/teacher/${id}`);
    return response.data;
}

export const addStudentCourse = async (id: number, courseId: string): Promise<ResponseSingle<{id: string}>> => {
    const response = await axiosInstance.put(`/courseSemester/${courseId}/student/${id}`, {
        id,
        enrollCourseId: courseId,
    });
    return response.data;
}

export const removeStudentCourse = async (id: number, courseId: string): Promise<ResponseSingle<{id: string}>> => {
    const response = await axiosInstance.delete(`/courseSemester/${courseId}/student/${id}`);
    return response.data;
}

export const deleteCourse = async (id: string): Promise<ResponseSingle<CourseSemesterModel>> => {
    const response = await axiosInstance.delete(`/courseSemester/${id}`);
    return response.data;
}

export const editCourseSemester = async ( id: string, data: AddSemesterCourseData ): Promise<ResponseSingle<CourseSemesterModel>> => {
    const response = await axiosInstance.put(`/courseSemester/${id}`, {
        ...data
     });
    return response.data;
}