import type { Request, Response } from 'express';
import createSemester from '../../repositories/semester/createSemester';
import {z} from "zod";
import { SemesterSeason } from '@prisma/client';
import { DuplicateRecordError } from '../../repositories/errors';

const semesterSchema = z.object({
    year: z
      .number({
        required_error: 'year is required',
      }),
    season: z
      .nativeEnum(SemesterSeason, {
        required_error: "SemesterSeason is required"
    }),
    semesterStart : z.coerce
      .date({
        required_error: "SemesterStart is required"
    })
    ,
    semesterEnd : z.coerce
      .date({
        required_error: "SemesterEnd is required"
    }),
  });

const createSemesterAPI = async (req: Request, res: Response) => {
    try {
      const semesterData = await semesterSchema.parseAsync(req.body);
      const semester = await createSemester(semesterData);
      if (semester.isOk) {
        return res.status(201).send({
          status: 'success',
          data: semester.unwrap(),
        });
      }
  
      throw semester.error;
    } catch (e) {
      if (e instanceof z.ZodError) {
        return res.status(400).send({
          status: 'error',
          error: e.errors,
        });
      }
      if (e instanceof DuplicateRecordError) {
        return res.status(409).send({
            status: 'error',
            error: e.message,
        });
    }
  
      return res.status(500).send({
        status: 'error',
        error: 'Internal Server Error',
      });
    }
  };

export default createSemesterAPI;