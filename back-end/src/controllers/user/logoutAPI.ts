import type { Request, Response } from 'express';
import loginUser from '../../repositories/user/loginUser';
import {z} from "zod";
import { DeletedRecordError, NonexistentRecordError, VerificationFailedError } from '../../repositories/errors';

const logoutAPI = async (req: Request, res: Response) => {
    try {
        //req.session.destroy(() => {});
        return res.status(200).send({
            status: 'success',
            message: "Logged in",
        });
    } catch (e) {
  
      return res.status(500).send({
        status: 'error',
        error: 'Internal Server Error',
      });
    }
  };

export default logoutAPI;