import { UserModel, CourseModel, AddSemesterCourseData, CourseModelUndefined, SeminarGroupModel, ReadResult } from "../models";
import axiosInstance from "../base";
import { ResponseMulti, ResponseSingle } from "../responses";

export const getSeminars = async (id: string): Promise<ResponseMulti<ReadResult>> => {
    const response = await axiosInstance.get(`/courseSemester/${id}/seminar`);
    return response.data;
}

export const createCourse = async (id: string, courseData: SeminarGroupModel): Promise<ResponseSingle<{id: string}>> => {
    console.log(courseData)
    const response = await axiosInstance.post(`/courseSemester/${id}/seminar`, {
        ...courseData
     });
    return response.data;
}

export const addTeacherSeminar = async (id: number, courseId: string): Promise<ResponseSingle<{id: string}>> => {
    const response = await axiosInstance.put(`/seminar/${courseId}/teacher/${id}`, {
        id,
        enrollSeminarId: courseId,
    });
    return response.data;
}

export const removeTeacherSeminar = async (id: number, courseId: string): Promise<ResponseSingle<{id: string}>> => {
    const response = await axiosInstance.delete(`/seminar/${courseId}/teacher/${id}`);
    return response.data;
}

export const getSeminarStudent = async (id: string): Promise<ResponseSingle<ReadResult>> => {
    const response = await axiosInstance.get(`/seminar/${id}`);
    return response.data;
}

export const getSeminar = async (id: string): Promise<ResponseSingle<ReadResult>> => {
    const response = await axiosInstance.get(`/seminar/${id}/teacher`);
    return response.data;
}

export const deleteSeminar = async (id: string): Promise<ResponseSingle<ReadResult>> => {
    const response = await axiosInstance.delete(`/seminar/${id}`);
    return response.data;
}

export const addStudentSeminar = async (id: number, seminarId: string): Promise<ResponseSingle<{id: string}>> => {
    const response = await axiosInstance.put(`/seminar/${seminarId}/student/${id}`, {
        id,
        enrollSeminarId: seminarId,
    });
    return response.data;
}

export const removeStudentSeminar = async (id: number, seminarId: string): Promise<ResponseSingle<{id: string}>> => {
    const response = await axiosInstance.delete(`/seminar/${seminarId}/student/${id}`);
    return response.data;
}

export const editSeminarGroup = async (id: string, seminarData: SeminarGroupModel): Promise<ResponseSingle<{id: string}>> => {
    const response = await axiosInstance.put(`/seminar/${id}`, {
        ...seminarData
     });
    return response.data;
}