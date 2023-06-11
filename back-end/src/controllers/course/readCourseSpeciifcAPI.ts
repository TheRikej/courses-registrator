import type { Request, Response } from 'express';
import readSpecificCourse from '../../repositories/course/readSpecificCourse';
import {z} from "zod";

const idSchema = z.object({
    id: z
      .string({
        required_error: 'Id is required',
      })
    })

const readCourseSemesterSpecificAPI = async (req: Request, res: Response) => {
    try {
      const data = await idSchema.parseAsync(req.params)
      const semester = await readSpecificCourse(data);
      if (semester.isOk) {
        return res.status(200).send({
          status: 'success',
          data: semester.unwrap(),
        });
      }
  
      throw semester.error;
    } catch (e) {
        if (e instanceof z.ZodError) {
            return res.status(404).send({
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

export default readCourseSemesterSpecificAPI;