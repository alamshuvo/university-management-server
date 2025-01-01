import { Router } from 'express';
import { UserControllers } from './user.controller';
import { studentValidations } from '../student/student.validation';
import validateRequest from '../../middleWare/validateRequest';

const router = Router();
router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);

router.post('/create-faculty',UserControllers.createFaculty)

export const userRoute = router;
