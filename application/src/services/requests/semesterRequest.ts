import { SemesterModel } from "../models";
import axiosInstance from "../base";
import { ResponseMulti, ResponseSingle } from "../responses";

export const getSemesters = async (): Promise<ResponseMulti<SemesterModel>> => {
    const response = await axiosInstance.get('/semester', {});
    return response.data;
}

/*export const getUser = async (id: string): Promise<ResponseSingle<UserModel>> => {
    const numberId = +id
    const response = await axiosInstance.get(`/user/${numberId}`);
    console.log(response.data)
    return response.data;
}

    export const changeStudentStatus = async (id: number, teacher: boolean, student: boolean, administrator: boolean): Promise<ResponseSingle<UserModel>> => {
    console.log(student)
    const response = await axiosInstance.put(`/user/${id}`, {
        teacher,
        student,
        administrator,
     });
     console.log(response.data)
    return response.data;
}*/