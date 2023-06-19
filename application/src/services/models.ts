export interface UserModel {
    id: number,
    userName: string,
    email: string,
    createdAt: string,
    teacher: boolean,
    student: boolean,
    administrator: boolean,
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
    credits: number,
    description: string,
    guarantorId: number,
    name: string,
    facultyId: string,
}

export interface CourseSemesterModel {
    course: {
        code: string,
        name: string,
        description: string,
        guarantor: string,
        credits: number,
        faculty: string,
      },
      id: string,
      semesterSeason: string,
      semesterYear: number,
      capacity: number,
      maxCapacity: number,
      registrationEnd: string,
      registrationStart: string,
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