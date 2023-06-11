  
  export type UserCreateData = {
    userName: string;
    email: string;
    hashedPassword: string;
    salt: string;
  };

  export type UserDeleteData = {
    id: string;
  };

  export type addStudentCourseData = {
    id: string;
    enrollCourseId: string;
  };

  export type addTeacherCourseData = {
    id: string;
    enrollCourseId: string;
  };

  export type addTeacherSeminarData = {
    id: string;
    enrollSeminarId: string;
  };

  export type removeStudentCourseData = {
    id: string;
    enrollCourseId: string;
  };

  export type removeStudentSeminarData = {
    id: string;
    seminarId: string;
  };

  export type removeTeacherData = {
    id: string;
    courseId: string;
  };

  export type addStudentSeminarData = {
    id: string;
    enrollSeminarId: string;
  };

  export type UserReadSpecificData = {
    id: string;
  };