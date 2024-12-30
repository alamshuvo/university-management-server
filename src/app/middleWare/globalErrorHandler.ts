import { ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import config from '../config';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next): void => {
  type TErrorHandaler = {
    path: string | number;
    message: string;
  }[];

  let statusCode = err.statusCode || 500;
  let message = err.message || 'something went wrong';

  let errorSources: TErrorHandaler = [
    {
      path: '',
      message: 'Something Went Wrong',
    },
  ];

 
 const handleZodError =(err:ZodError)=>{
 const errorSources:TErrorHandaler = err.issues.map((issue:ZodIssue)=>{
   return {
    path:issue?.path[issue.path.length-1],
    message:issue?.message,
   }
 })

 return {
   statusCode: 400,
   message: 'Validation Error',
   errorSources
 }
  }
  if (err instanceof ZodError) {
    const simpliFiedError = handleZodError(err);
    statusCode = simpliFiedError?.statusCode;
    message = simpliFiedError?.message;
    errorSources = simpliFiedError?.errorSources
  }

// ultimate return
 res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack:config.node_env === "development" ? err?.stack : null
  });
 
};
export default globalErrorHandler;

//patrern
/*
sucess
mesage
errorSource:[
path:"",
message:"",
],
stack
*/
