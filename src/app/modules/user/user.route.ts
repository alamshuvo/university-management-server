import { NextFunction, Request, Response, Router } from 'express';
import { UserControllers } from './user.controller';
import { AnyZodObject } from 'zod';
import { studentValidations } from '../student/student.validation';

const router = Router();

const validateRequest = (scehme:AnyZodObject)=>{
return async (req:Request,res:Response,next:NextFunction)=>{
 try {
    await scehme.parseAsync({
        body:req.body
    });
    next();
 } catch (error) {
    next(error)
 }
}
}


router.post('/create-student',validateRequest(studentValidations.createStudentValidationSchema), UserControllers.createStudent);

export const userRoute = router;
