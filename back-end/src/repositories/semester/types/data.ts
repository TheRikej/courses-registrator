import type { SemesterSeason, Day } from '@prisma/client';

export type SemseterCreateData = {
  year: number
  season: SemesterSeason,
  semesterStart: Date,
  semesterEnd: Date,
};

export type ReadSemesterData = {
  id: string;
}

export type ReadAllSemesterData = {
  year?: number;
  season?: SemesterSeason;
}

export type DeleteData = {
  id: string;
};