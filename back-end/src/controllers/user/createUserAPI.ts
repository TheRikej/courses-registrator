import type { Request, Response } from 'express';
import createUser from '../../repositories/user/createUser';
import {z} from "zod";
import { Prisma } from '@prisma/client';

const UserSchema = z.object({
    userName: z
      .string({
        required_error: 'Name is required',
      })
      .trim()
      .min(1, 'Name cannot be empty'),
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
      .min(1, 'Name cannot be empty'),
  });

const createUserAPI = async (req: Request, res: Response) => {
    try {
      const userData = await UserSchema.parseAsync(req.body);
      const user = await createUser(userData);
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
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(409).send({
            status: 'error',
            error: "Email already in use",
          });
        }
  
      return res.status(500).send({
        status: 'error',
        error: 'Internal Server Error',
      });
    }
  };

export default createUserAPI;