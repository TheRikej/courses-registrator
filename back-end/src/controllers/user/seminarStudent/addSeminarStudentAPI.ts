import type { Request, Response } from 'express';
import addSeminarStudent from '../../../repositories/user/seminarUser/addSeminarUser';
import {z} from "zod";
import { DeletedRecordError, NonexistentRecordError, OperationNotAllowedError } from '../../../repositories/errors';

const idSchema = z.object({
    id: z.coerce
      .number({
        required_error: 'User Id is required',
      }),
    enrollSeminarId: z
      .string({
        required_error: 'Seminar Id is required',
      })
  });

const addSeminarStudentAPI = async (req: Request, res: Response) => {
    try {
      const userData = await idSchema.parseAsync(req.params);
      if (userData.id !== req.session.user?.id && !req.session.user?.admin) {
        return res.status(403).json({ message: "You don't have rights to make operations with this user" });
      }
      const user = await addSeminarStudent(userData);
      if (user.isOk) {
        return res.status(201).send({
          status: 'success',
          data: user.unwrap(),
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
            if (e instanceof OperationNotAllowedError) {
              console.log(e.message)
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

export default addSeminarStudentAPI;