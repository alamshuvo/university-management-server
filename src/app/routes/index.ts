import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.routes';
import { userRoute } from '../modules/user/user.route';

const router = Router();

const modulRoutes = [
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
];
modulRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
