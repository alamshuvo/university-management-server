import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middleWare/globalErrorHandler';
import notFoundRoute from './app/middleWare/notFoundRoute';
import router from './app/routes';
import cookieParser from 'cookie-parser'
const app: Application = express();
//parser
app.use(express.json());
app.use(cookieParser())
app.use(cors({origin:['http://localhost:5173'],credentials:true}));

// applications routes
app.use('/api/v1', router);

app.get('/', (_req: Request, res: Response) => {
  const a = 10;
  res.send(a);
});

app.use(globalErrorHandler);
//not found route
app.use(notFoundRoute);

console.log(process.cwd());

export default app;
