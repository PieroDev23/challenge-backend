import { NextFunction, Request, Response } from 'express';
import { CreateProjectRequestSchema } from '../../../schemas';
import { parseZodSchema } from '../../../_lib';
import { HTTP_CODE_CLIENT_ERROR } from '../../../constants';


export const validateCreateProjectSchema = (req: Request, res: Response, next: NextFunction) => {
    const error = parseZodSchema(CreateProjectRequestSchema, req.body);

    if(error){
        return res.status(HTTP_CODE_CLIENT_ERROR).json(error);
    }

    next();
}