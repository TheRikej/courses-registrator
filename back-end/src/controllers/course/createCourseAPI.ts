import type { Request, Response } from 'express';
import createCourse from '../../repositories/course/createCourse';
import {z} from "zod";
import { Prisma } from '@prisma/client';

const courseSchema = z.object({
    description: z
      .string({
        required_error: 'Description is required',
    }),
    name : z
      .string({
        required_error: "Name is required"
      })
      .trim()
      .min(1, "Name cannot be empty"),
    facultyId : z
      .string({
        required_error: "FacultyId is required"
    }),
    credits : z
      .number({
        required_error: "Credits are required"
    }),
    id: z
      .string({
        required_error: 'Id is required',
      })
      .trim()
      .min(1, "Course Id cannot be empty"),
    guarantorId: z
        .number({
            required_error: 'GuarantorId is required',
        })
  });

const createCourseAPI = async (req: Request, res: Response) => {
    try {
      const courseData = await courseSchema.parseAsync(req.body);
      const course = await createCourse(courseData);
      if (course.isOk) {
        return res.status(201).send({
          status: 'success',
          data: course.unwrap(),
        });
      }
  
      throw course.error;
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
            error: e.message,
          });
        }
  
      return res.status(500).send({
        status: 'error',
        error: 'Internal Server Error',
      });
    }
  };

export default createCourseAPI;