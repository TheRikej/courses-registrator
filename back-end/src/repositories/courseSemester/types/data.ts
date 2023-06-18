  import { Day } from "@prisma/client";
import { LoggedInUser } from "../../types";

  export type ReadCourseSemesterData = {
    id: string;
  };

  export type ReadAllCourseSemesterData = {
    courseId?: string;
    semesterId?: string;
    facultyId?: string;
  };

  export type DeleteData = {
    loggedInUser: LoggedInUser
    id: string;
  };

  export type UpdateData = {
    loggedInUser: LoggedInUser
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