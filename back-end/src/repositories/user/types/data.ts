import { LoggedInUser } from "../../types";

  
  export type UserCreateData = {
    userName: string;
    email: string;
    password: string;
  };

  export type UserDeleteData = {
    id: number;
  };

  export type addStudentCourseData = {
    id: number;
    enrollCourseId: string;
  };

  export type addTeacherCourseData = {
    loggedInUser: LoggedInUser
    id: number;
    enrollCourseId: string;
  };

  export type addTeacherSeminarData = {
    loggedInUser: LoggedInUser
    id: number;
    enrollSeminarId: string;
  };

  export type removeStudentCourseData = {
    id: number;
    enrollCourseId: string;
  };

  export type removeStudentSeminarData = {
    id: number;
    seminarId: string;
  };

  export type removeTeacherData = {
    loggedInUser: LoggedInUser
    id: number;
    courseId: string;
  };

  export type removeTeacherSeminarData = {
    loggedInUser: LoggedInUser
    id: number;
    seminarId: string;
  };

  export type addStudentSeminarData = {
    id: number;
    enrollSeminarId: string;
  };

  export type UserReadSpecificData = {
    id: number;
  };

  export type LoginData = {
    email: string;
    password: string;
  };

  export type UpdateData = {
    id: number,
    student: boolean,
    administrator: boolean,
    teacher: boolean,
  };