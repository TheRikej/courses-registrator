import type { Request, Response } from 'express';
import removeCourseStudent from '../../../repositories/user/courseUser/removeCourseUser';
import {z} from "zod";

const idSchema = z.object({
    id: z.coerce
      .number({
        required_error: 'Id is required',
      }),
    enrollCourseId: z
      .string({
        required_error: 'Id is required',
      }),
    })

const removeCourseStudentAPI = async (req: Request, res: Response) => {
    try {
      const data = await idSchema.parseAsync(req.params);
      if (data.id != req.session.user?.id && !req.session.user?.admin) {
        return res.status(403).json({ message: "You don't have rights to make operations with this user" });
      }
      const user = await removeCourseStudent(data);
      if (user.isOk) {
        return res.status(204).send({
          status: 'success',
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

export default removeCourseStudentAPI;