  import { Day } from "@prisma/client";

  export type ReadCourseSemesterData = {
    id: string;
  };

  export type ReadAllCourseSemesterData = {
    courseId?: string;
    semesterId?: string;
    facultyId?: string;
  };

  export type DeleteData = {
    id: string;
  };

  export type UpdateData = {
    id: string,
    registrationStart?: Date,
    registrationEnd?:   Date,
    capacity?:          number,
    timeslot?: {
      day:          Day,
      startHour:    number,
      startMinute:  number,
      endHour:      number,
      endMinute:    number,
    }
    room?:              string,
  }