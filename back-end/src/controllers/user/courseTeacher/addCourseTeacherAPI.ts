import type { Request, Response } from 'express';
import addCourseTeacher from '../../../repositories/user/courseTeacher/addCourseTeacher';
import {z} from "zod";
import { Prisma } from '@prisma/client';

const idSchema = z.object({
    id: z
      .string({
        required_error: 'User Id is required',
      }),
    enrollCourseId: z
      .string({
        required_error: 'Course Id is required',
      })
  });

const addCourseTeacherAPI = async (req: Request, res: Response) => {
    try {
      const userData = await idSchema.parseAsync(req.body);
      const user = await addCourseTeacher(userData);
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

export default addCourseTeacherAPI;