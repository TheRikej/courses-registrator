import { SemesterModel, SemesterCreateModel } from "../models";
import axiosInstance from "../base";
import { ResponseMulti, ResponseSingle } from "../responses";

export const getSemesters = async (): Promise<ResponseMulti<SemesterModel>> => {
    const response = await axiosInstance.get('/semester', {});
    return response.data;
}

export const deleteSemester = async (id: string): Promise<ResponseSingle<SemesterModel>> => {
    const response = await axiosInstance.delete(`/semester/${id}`);
    return response.data;
}

export const createSemester = async (semesterData: SemesterCreateModel): Promise<ResponseSingle<SemesterModel>> => {
    const response = await axiosInstance.post(`/semester`, {
        ...semesterData
     });
    return response.data;
}

export const updateSemester = async (id: string, semesterData: SemesterCreateModel): Promise<ResponseSingle<SemesterModel>> => {
    const response = await axiosInstance.put(`/semester/${id}`, {
        ...semesterData
     });
    return response.data;
}