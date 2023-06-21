export interface CoursesFilterData {
	semester: string;
	faculty: string;
	nameCode: string;
	endrolled: boolean;
	teaching: boolean;
}
  
export const defaultCoursesFilterData: CoursesFilterData = {
	semester: "_None_",
	faculty: "_All_",
	nameCode: "",
	endrolled: false,
	teaching: false,
};

export interface UserModel {
    id: number,
    userName: string,
    email: string,
    createdAt: string,
    teacher: boolean,
    student: boolean,
    administrator: boolean,
    studiedCourses: {
        id: string,
        course: {
            id: string
        }
    }[],
    studiedGroups: {
        id: string,
        group: {
            id: string
        }
    }[]
}

export interface UserCreateModel {
    userName: string,
    email: string,
    password: string,
}

export interface UserLoginModel {
    email: string,
    password: string,
}

export interface SemesterModel {
    id: string,
    year: number,
    season: string,
    semesterStart: Date,
    semesterEnd: Date,
}

export interface SemesterCreateModel {
    year: number,
    season: string,
    semesterStart: Date,
    semesterEnd: Date,
}

export interface FacultyModel {
    name: string,
    id: string,
}

export interface CourseModel {
    id: string,
    guarantor: {
      userName: string,
    },
    faculty: {
      id: string;
      name: string;
      deletedAt: Date | null;
    },
    description: string,
    name: string,
    credits: number,
}

export interface CourseCreateModel {
    id: string,
    guarantorId: number,
    facultyId: string,
    description: string,
    name: string,
    credits: number,
}

export interface CourseModelUndefined {
    newId: string | undefined,
    id: string | undefined,
    credits: number | undefined,
    description: string | undefined,
    guarantorId: number | undefined,
    name: string | undefined,
    facultyId: string | undefined,
}

export interface CourseSemesterModel {
    course: {
        code: string,
        name: string,
        description: string,
        guarantor: number,
        credits: number,
        faculty: string,
      },
      id: string,
      semesterSeason: string,
      semesterYear: number,
      capacity: number,
      maxCapacity: number,
      registrationEnd: Date,
      registrationStart: Date,
      room: string | null,
      teachers: string[],
}

export interface AddSemesterCourseData {
    semesterId: string,
    registrationStart: Date,
    registrationEnd: Date,
    capacity: number,
    room: string | undefined,
    timeslot: {
        day: string,
        startHour: number;
        startMinute: number;
        endHour: number;
        endMinute: number;
    } | undefined,
}

export interface SeminarGroupModel {
    groupNumber: number,
    registrationStart: Date,
    registrationEnd: Date,
    capacity: number,
    room: string,
    timeslot: {
        day: string;
        startHour: number;
        startMinute: number;
        endHour: number;
        endMinute: number,
    }
  }