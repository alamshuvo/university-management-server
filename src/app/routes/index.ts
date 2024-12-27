import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.routes';
import { userRoute } from '../modules/user/user.route';
import path from 'path';
import { AcedemicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';

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
  {
    path:'/academic-semesters',
    route: AcedemicSemesterRoutes

  }
];
modulRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
