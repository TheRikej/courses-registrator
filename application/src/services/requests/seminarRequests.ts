import { UserModel, CourseModel, AddSemesterCourseData, CourseModelUndefined } from "../models";
import axiosInstance from "../base";
import { ResponseMulti, ResponseSingle } from "../responses";
import type { ReadAllResult } from "../../../../back-end/src/repositories/seminar/types/result"

export const getSeminars = async (id: string): Promise<ResponseMulti<ReadAllResult>> => {
    const response = await axiosInstance.get(`/courseSemester/${id}/seminar`);
    return response.data;
}

/*export const getCourseSemester = async (id: string): Promise<ResponseSingle<CourseSpecific>> => {
    const response = await axiosInstance.get(`/courseSemester/${id}`);
    return response.data;
}*/