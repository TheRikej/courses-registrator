import type { Request, Response } from 'express';
import loginUser from '../../repositories/user/loginUser';
import {z} from "zod";
import { DeletedRecordError, NonexistentRecordError, VerificationFailedError } from '../../repositories/errors';

const UserSchema = z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .trim()
      .min(1, 'Email cannot be empty')
      .email('Invalid email'),
    password: z
      .string({
        required_error: 'Password is required',
      })
  });

const loginAPI = async (req: Request, res: Response) => {
    try {
      const userData = await UserSchema.parseAsync(req.body);
      const user = await loginUser(userData);
      if (user.isOk) {
        const data = user.unwrap()
        req.session.user = {
            id: data.id,
            student: data.student,
            teacher: data.teacher,
            admin: data.administrator
        }
        return res.status(200).send({
          status: 'success',
          data: data,
          message: "Logged in",
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
    if (e instanceof VerificationFailedError) {
        return res.status(401).send({
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

export default loginAPI;