import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.routes';
import { userRoute } from '../modules/user/user.route';
import { AcedemicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { academicFacultyRoute } from '../modules/academicFaculty/academicFaculty.route';
import { academicDepertmentRoute } from '../modules/academicDepertment/academicDepertment.route';

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
    path: '/academic-semesters',
    route: AcedemicSemesterRoutes,
  },
  {
    path: '/academic-faculty',
    route: academicFacultyRoute,
  },
  {
    path: '/academic-depertment',
    route: academicDepertmentRoute,
  },
];
modulRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
