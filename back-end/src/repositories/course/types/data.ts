import type { Faculty } from '@prisma/client';

export type CourseCreateData = {
    description: string,
    name: string
    //faculty: Faculty,
  };

  export type AddCreateSemesterData = {
    id: string,
    semesterId: string,
    registrationEnd: Date,
    registrationStart: Date,
    capacity: number,
  };