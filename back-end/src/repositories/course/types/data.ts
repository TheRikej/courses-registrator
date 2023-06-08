export type CourseCreateData = {
    description: string,
    name: string
    facultyId: string;
    credits: number;
    id: string;
  };

  export type AddCreateSemesterData = {
    id: string,
    semesterId: string,
    registrationEnd: Date,
    registrationStart: Date,
    capacity: number,
  };

  export type ReadCourseData = {
    id?: string;
    name?: string;
  }

  export type ReadAllCourseData = {
    facultyId?: string;
  }

  export type DeleteData = {
    id: string;
  };