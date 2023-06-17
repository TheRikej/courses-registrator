  
  export type UserCreateData = {
    userName: string;
    email: string;
    hashedPassword: string;
    teacher: boolean,
    student: boolean,
    admin: boolean,
  };

  export type UserDeleteData = {
    id: number;
  };

  export type addStudentCourseData = {
    id: number;
    enrollCourseId: string;
  };

  export type addTeacherCourseData = {
    id: number;
    enrollCourseId: string;
  };

  export type addTeacherSeminarData = {
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
    id: number;
    courseId: string;
  };

  export type removeTeacherSeminarData = {
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