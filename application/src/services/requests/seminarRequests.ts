import { UserModel, CourseModel, AddSemesterCourseData, CourseModelUndefined, SeminarGroupModel } from "../models";
import axiosInstance from "../base";
import { ResponseMulti, ResponseSingle } from "../responses";
import type { ReadResult } from "../../../../back-end/src/repositories/seminar/types/result"

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