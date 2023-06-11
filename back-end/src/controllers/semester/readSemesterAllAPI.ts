import type { Request, Response } from 'express';
import readAllSemester from '../../repositories/semester/readAllSemester';
import {z} from 'zod'
import { SemesterSeason } from '@prisma/client';

const readSemesterSchema = z.object({
    year: z
      .number()
      .optional(),
    season: z
      .nativeEnum(SemesterSeason)
      .optional(),
})

const readUserAllAPI = async (req: Request, res: Response) => {
    try {
      const data = await readSemesterSchema.parseAsync(req.body)
      const semesters = await readAllSemester(data);
      if (semesters.isOk) {
        return res.status(200).send({
          status: 'success',
          data: semesters.unwrap(),
        });
      }
  
      throw semesters.error;
    } catch (e) { 
    
      if (e instanceof z.ZodError) {
        return res.status(400).send({
            status: 'error',
            error: e.errors,
        });
        }
      return res.status(500).send({
        status: 'error',
        error: 'Internal Server Error',
      });
    }
  };

export default readUserAllAPI;