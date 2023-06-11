import type { Request, Response } from 'express';
import removeSeminarTeacher from '../../../repositories/user/seminarTeacher/removeSeminarTeacher';
import {z} from "zod";

const idSchema = z.object({
    id: z
      .string({
        required_error: 'Id is required',
      }),
    courseId: z //TODO fix with repositary update
      .string({
        required_error: 'Id is required',
      }),
    })

const removeSeminarTeacherAPI = async (req: Request, res: Response) => {
    try {
      const data = await idSchema.parseAsync(req.params)
      const user = await removeSeminarTeacher(data);
      if (user.isOk) {
        return res.status(200).send({
          status: 'success',
          data: user.unwrap(),
        });
      }
  
      throw user.error;
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

export default removeSeminarTeacherAPI;