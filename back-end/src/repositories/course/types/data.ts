import type { Day } from '@prisma/client';
import { number } from 'zod';

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
    room?: string;
    timeslot?: {
      day:          Day,
      startHour:    number,
      startMinute:  number,
      endHour:      number,
      endMinute:    number,
    }
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

  export type UpdateData = {
    id: string,
    description?:      string,
    name?:             string,
    faculty?:          string,
    credits?:          number,
  }