import type { Request, Response } from 'express';
import createSemester from '../../repositories/semester/createSemester';
import {z} from "zod";
import { SemesterSeason } from '@prisma/client';
import { DeletedRecordError, DuplicateRecordError, NonexistentRecordError } from '../../repositories/errors';
import updateSemester from '../../repositories/semester/updateSemester';

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

  const idSchema = z.object({
    id: z
      .string({
        required_error: 'Id is required',
      })
    })

const updateSemesterAPI = async (req: Request, res: Response) => {
    try {
    const data = await idSchema.parseAsync(req.params)
      const semesterData = await semesterSchema.parseAsync(req.body);
      const semester = await updateSemester({...semesterData, id: data.id});
      if (semester.isOk) {
        return res.status(200).send({
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
    if (e instanceof NonexistentRecordError) {
        return res.status(400).send({
            status: 'error',
            error: e.message,
        });
    }
    if (e instanceof DeletedRecordError) {
        return res.status(410).send({
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

export default updateSemesterAPI;