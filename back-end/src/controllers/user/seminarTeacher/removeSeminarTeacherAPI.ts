import type { Request, Response } from 'express';
import removeSeminarTeacher from '../../../repositories/user/seminarTeacher/removeSeminarTeacher';
import {z} from "zod";
import { AuthorizationFailedError, DeletedRecordError, MissingRelationError, NonexistentRecordError } from '../../../repositories/errors';

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

const removeSeminarTeacherAPI = async (req: Request, res: Response) => {
    try {
      const data = await idSchema.parseAsync(req.params)
      if (req.session?.user === undefined) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const user = await removeSeminarTeacher({...data, loggedInUser: req.session.user});
      
      if (user.isOk) {
        return res.status(204).send({
          status: 'success',
        });
      }
  
      throw user.error;
    } catch (e) {
        if (e instanceof z.ZodError) {
            return res.status(400).send({
                status: 'error',
                error: e.errors,
            });
        }
        if (e instanceof AuthorizationFailedError) {
            return res.status(403).send({
                status: 'error',
                error: e.message,
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
        if (e instanceof MissingRelationError) {
            return res.status(204).send({
                status: 'success',
                message: e.message,
            });
        }      
  
      return res.status(500).send({
        status: 'error',
        error: 'Internal Server Error',
      });
    }
  };

export default removeSeminarTeacherAPI;