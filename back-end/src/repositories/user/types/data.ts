  
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

  export type addStudentSeminarData = {
    id: string;
    enrollSeminarId: string;
  };

  export type UserReadSpecificData = {
    id: string;
  };