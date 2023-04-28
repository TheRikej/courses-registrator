import type { SemesterSeason } from '@prisma/client';

export type SemseterCreateData = {
  year: number
  season: SemesterSeason,
  semesterStart: Date,
  semesterEnd: Date,
};