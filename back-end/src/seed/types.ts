/* IMPORTANT: Do NOT modify this file */
/* These are the types of the data from the JSON document */

type SeasonJson = "SPRING" | "FALL"

export type UserJson = {
  id: string;
  userName: string;
  email: string;
  createdAt: string;
  deletedAt?: string;
  hashedPassword: string;
  salt: string;
};


export type CourseJson = {
  id: string;
  description: string;
  name: string;
  deletedAt?: string;
};

export type SemesterJson = {
  id: string;
  year: number;
  season: SeasonJson;
  semesterStart: string;
  semesterEnd: string;
  deletedAt?: string;
};
