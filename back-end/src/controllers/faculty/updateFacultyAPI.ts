import type { Request, Response } from 'express';
import updateUser from '../../repositories/user/updateUserStatus';
import {z} from "zod";
import { NonexistentRecordError, DeletedRecordError, DuplicateRecordError } from '../../repositories/errors';
import updateFaculty from '../../repositories/faculty/updateFaculty';

const idSchema = z.object({
    id: z
      .string({
        required_error: 'Id is required',
      })
    })

const UserUpdateSchema = z.object({
    name: z
        .string({
            required_error: 'Name is required',
        })
    });

const updateFacultyAPI = async (req: Request, res: Response) => {
    try {
        const id = await idSchema.parseAsync(req.params)
        console.log({...id})
        const userData = await UserUpdateSchema.parseAsync(req.body)
        const user = await updateFaculty({
            ...id,
            name: userData.name,
        });
        if (user.isOk) {
          return res.status(200).send({
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
            return res.status(400).send({
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
        if (e instanceof DuplicateRecordError) {
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

export default updateFacultyAPI;