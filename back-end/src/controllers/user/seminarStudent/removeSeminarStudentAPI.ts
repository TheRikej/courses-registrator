import type { Request, Response } from 'express';
import removeSeminarStudent from '../../../repositories/user/seminarUser/removeSeminarUser';
import {z} from "zod";
import { DeletedRecordError, NonexistentRecordError } from '../../../repositories/errors';

const idSchema = z.object({
    id: z.coerce
      .number({
        required_error: 'Id is required',
      }),
    seminarId: z
      .string({
        required_error: 'Id is required',
      }),
    })

const removeSeminarStudentAPI = async (req: Request, res: Response) => {
    try {
      const data = await idSchema.parseAsync(req.params);
      if (data.id != req.session.user?.id && !req.session.user?.admin) {
        return res.status(403).json({ message: "You don't have rights to make operations with this user" });
      }
      const user = await removeSeminarStudent(data);
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
        if (e instanceof NonexistentRecordError) {
            return res.status(404).send({
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

export default removeSeminarStudentAPI;