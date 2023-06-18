import { UserModel, CourseModel } from "../models";
import axiosInstance from "../base";
import { ResponseMulti, ResponseSingle } from "../responses";

export const getCourses = async (): Promise<ResponseMulti<UserModel>> => {
    const response = await axiosInstance.get('/user');
    return response.data;
}

export const getUser = async (id: string): Promise<ResponseSingle<UserModel>> => {
    const numberId = +id
    const response = await axiosInstance.get(`/user/${numberId}`);
    return response.data;
}

export const createCourse = async (courseData: CourseModel): Promise<ResponseSingle<CourseModel>> => {
    const response = await axiosInstance.post(`/course`, {
        ...courseData
     });
    return response.data;
}