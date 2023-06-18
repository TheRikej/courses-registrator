import { FacultyModel } from "../models";
import axiosInstance from "../base";
import { ResponseMulti, ResponseSingle } from "../responses";

export const getFaculties = async (): Promise<ResponseMulti<FacultyModel>> => {
    const response = await axiosInstance.get('/faculty');
    return response.data;
}

export const createFaculty = async (name: string): Promise<ResponseSingle<FacultyModel>> => {
    const response = await axiosInstance.post(`/faculty`, {name});
    return response.data;
}

export const editFaculty = async (name: string, id: string): Promise<ResponseSingle<FacultyModel>> => {
    const response = await axiosInstance.put(`/faculty/${id}`, {name});
    return response.data;
}

export const deleteFaculty = async (id: string): Promise<ResponseSingle<FacultyModel>> => {
    const response = await axiosInstance.delete(`/faculty/${id}`);
    return response.data;
}