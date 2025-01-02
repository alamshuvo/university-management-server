import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.routes';
import { userRoute } from '../modules/user/user.route';
import { AcedemicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { academicFacultyRoute } from '../modules/academicFaculty/academicFaculty.route';
import { academicDepertmentRoute } from '../modules/academicDepertment/academicDepertment.route';
import { FacultyRoutes } from '../modules/faculty/faculty.route';
import { courseRoute } from '../modules/course/course.route';
import { semesterRegistationRoute } from '../modules/semsesterRegistation/semesterRegistation.route';

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
  {
    path: '/faculty',
    route: FacultyRoutes,
  },
  {
    path: '/courses',
    route: courseRoute,
  },
  {
    path: '/semister-registation',
    route: semesterRegistationRoute,
  },
];
modulRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
