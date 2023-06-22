import type { Request, Response } from 'express';
import updateCourse from '../../repositories/course/updateCourse';
import {z} from "zod";
import { AuthorizationFailedError, DeletedRecordError, NonexistentRecordError } from '../../repositories/errors';

const idSchema = z.object({
    id: z
      .string({
        required_error: 'Id is required',
      })
    })
const courseSchema = z.object({
    description: z
      .string()
      .optional(),
    name : z
      .string()
      .trim()
      .min(1, "Name cannot be empty")
      .optional(),
    facultyId : z
      .string()
      .optional(),
    credits : z
      .number()
      .optional(),
    guarantor: z
      .number()
      .optional(),
      newId: z
      .string()
      .optional(),
  });

const updateCourseAPI = async (req: Request, res: Response) => {
    try {
        const id = await idSchema.parseAsync(req.params)
        const courseData = await courseSchema.parseAsync(req.body)
        if (req.session?.user === undefined) {
            return res.status(401).json({ message: "Unauthorized" });
          }          
        const course = await updateCourse({
            ...id,
            ...courseData,
            loggedInUser: req.session.user
        });
        
        if (course.isOk) {
          return res.status(200).send({
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
    
        return res.status(500).send({
          status: 'error',
          error: 'Internal Server Error',
        });
      }
    };

export default updateCourseAPI;