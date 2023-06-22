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
            id: string,
            course: {
                id: string
            }
        }
    }[],
    studiedGroups: {
        id: string,
        group: {
            id: string
        }
    }[],
    taughtCourses: {
        id: string,
        course: {
            id: string
        }
    }[],
    taughtGroups: {
        id: string,
    }[],
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

  // Prisma models from backend

  export type CourseAll = {
    id: string;
    description: string;
    name: string;
    deletedAt: Date | null;
    guarantorId: number;
    facultyId: string;
    credits: number;
} & {
    faculty: {
        id: string;
        name: string;
        deletedAt: Date | null;
    },
    guarantor: {userName: string},
};

export type CourseSpecific = {
    id: string;
    description: string;
    name: string;
    deletedAt: Date | null;
    guarantorId: number;
    facultyId: string;
    credits: number;
} & {
    faculty: {
        id: string;
        name: string;
        deletedAt: Date | null;
    },
    guarantor: {userName: string},
    courseSemesters: ({
        id: string;
        registrationStart: Date;
        registrationEnd: Date;
        capacity: number;
        deletedAt: Date | null;
        courseId: string;
        semesterId: string;
        timeSlotId: string | null;
        room: string | null;
    } & {
        semester: {
            id: string;
            year: number;
            season: string;
            semesterStart: Date;
            semesterEnd: Date;
            deletedAt: Date | null;
        },
    })[],
    semesters: string[]
};

export type CourseSemesterSpecific = {
    id: string;
    registrationStart: Date;
    registrationEnd: Date;
    capacity: number;
    deletedAt: Date | null;
    courseId: string;
    semesterId: string;
    timeSlotId: string | null;
    room: string | null;
} & {
    teachers: {userName: string, id: number}[];
    students: {
        id: string;
        deletedAt: Date | null;
        studentId: number;
        courseId: string;
    }[];
    seminarGroups: {
        id: string;
        registrationStart: Date;
        registrationEnd: Date;
        capacity: number;
        deletedAt: Date | null;
        courseSemesterId: string;
        groupNumber: number;
        timeSlotId: string;
        room: string;
    }[];
    currentCapacity: number;
    course: {
        id: string;
        description: string;
        name: string;
        deletedAt: Date | null;
        guarantorId: number;
        facultyId: string;
        credits: number;
    } & {
        faculty: {
            id: string;
            name: string;
            deletedAt: Date | null;
        },
        guarantor: {userName: string},
    },
    semester: {
        id: string;
        year: number;
        season: string;
        semesterStart: Date;
        semesterEnd: Date;
        deletedAt: Date | null;
    },
    timeSlot: {
        id: string;
        day: string;
        startHour: number;
        startMinute: number;
        endHour: number;
        endMinute: number;
    } | null,
}

export type ReadResult = {
    id: string;
    registrationStart: Date;
    registrationEnd: Date;
    capacity: number;
    deletedAt: Date | null;
    courseSemesterId: string;
    groupNumber: number;
    timeSlotId: string;
    room: string;
} & {
    timeSlot: {
        id: string;
        day: string;
        startHour: number;
        startMinute: number;
        endHour: number;
        endMinute: number;
    };
    teachers: {userName: string, id: number}[];
    students: ({
        id: string;
        deletedAt: Date | null;
        studentId: number;
        groupId: string;
    } & {
        student: {userName: string}
    })[];
    currentCapacity: number;
}