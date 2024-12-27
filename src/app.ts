import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middleWare/globalErrorHandler';
import notFoundRoute from './app/middleWare/notFoundRoute';
import router from './app/routes';
const app: Application = express();
//parser
app.use(express.json());
app.use(cors());

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
