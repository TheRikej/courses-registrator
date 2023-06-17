import { UserModel } from "./models";
import axiosInstance from "./base";
import { ResponseMulti, ResponseSingle } from "./responses";

export const getUsers = async (): Promise<ResponseMulti<UserModel>> => {
    const response = await axiosInstance.get('/user');
    return response.data;
}

/*export const getSingle = async (id: string): Promise<ResponseSingle<ExtendedChannel>> => {
    const response = await axiosInstance.get(`/channels/${id}`);
    return response.data;
}

export const addChannel = async (name: string, description: string): Promise<ResponseSingle<Channel>> => {
    const response = await axiosInstance.post(`/channels`, { name, description });
    return response.data;
}*/