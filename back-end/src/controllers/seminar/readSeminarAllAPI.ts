import type { Request, Response } from 'express';
import readAllSeminars from '../../repositories/seminar/readAllSeminarGroups';
import {z} from 'zod'
import { SemesterSeason } from '@prisma/client';
import { NonexistentRecordError } from '../../repositories/errors';

const idSchema = z.object({
    id: z
      .string({
        required_error: "Id is required"
      })
})

const readSeminarAllAPI = async (req: Request, res: Response) => {
    try {
      const data = await idSchema.parseAsync(req.params)
      const semesters = await readAllSeminars(data);
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
      if (e instanceof NonexistentRecordError) {
        return res.status(404).send({
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

export default readSeminarAllAPI;