import { UserModel, UserCreateModel, UserLoginModel } from "../models";
import axiosInstance from "../base";
import { ResponseMulti, ResponseSingle } from "../responses";

export const getUsers = async (): Promise<ResponseMulti<UserModel>> => {
    const response = await axiosInstance.get('/user');
    return response.data;
}

export const getUser = async (id: string): Promise<ResponseSingle<UserModel>> => {
    const numberId = +id
    const response = await axiosInstance.get(`/user/${numberId}`);
    return response.data;
}

export const deleteUser = async (id: string): Promise<ResponseSingle<UserModel>> => {
    const numberId = +id
    const response = await axiosInstance.delete(`/user/${numberId}`);
    return response.data;
}

    export const changeStudentStatus = async (id: number, teacher: boolean, student: boolean, administrator: boolean): Promise<ResponseSingle<UserModel>> => {
    const response = await axiosInstance.put(`/user/${id}`, {
        teacher,
        student,
        administrator,
     });
    return response.data;
}

export const createUser = async (userData: UserCreateModel): Promise<ResponseSingle<UserModel>> => {
    const response = await axiosInstance.post(`/user`, {
        ...userData
     });
    return response.data;
}

export const loginUser = async (userData: UserLoginModel): Promise<ResponseSingle<UserModel>> => {
    const response = await axiosInstance.post(`/login`, {
        ...userData
     });
    return response.data;
}

export const logout = async (): Promise<ResponseSingle<null>> => {
    const response = await axiosInstance.get(`/logout`);
    return response.data;
}