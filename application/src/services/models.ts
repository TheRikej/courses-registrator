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
    year: number,
    season: string,
    semesterStart: Date,
    semesterEnd: Date,
}