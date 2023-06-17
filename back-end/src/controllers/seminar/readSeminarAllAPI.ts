import type { Request, Response } from 'express';
import readAllSeminars from '../../repositories/seminar/readAllSeminarGroups';
import {z} from 'zod'
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
      const seminar = await readAllSeminars(data);
      if (seminar.isOk) {
        return res.status(200).send({
          status: 'success',
          data: seminar.unwrap(),
        });
      }
  
      throw seminar.error;
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

  const studentReadSeminarAllAPI = async (req: Request, res: Response) => {
    try {
      const data = await idSchema.parseAsync(req.params)
      const seminar = await readAllSeminars(data);
      if (seminar.isOk) {
        return res.status(200).send({
          status: 'success',
          data: seminar.unwrap().map(x => { return {...x, students: undefined }}),
        });
      }
  
      throw seminar.error;
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

export default {
    readSeminarAllAPI,
    studentReadSeminarAllAPI
    };