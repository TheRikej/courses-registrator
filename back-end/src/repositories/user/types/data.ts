  
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

  export type UserReadSpecificData = {
    userName: string;
  };