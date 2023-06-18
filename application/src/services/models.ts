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