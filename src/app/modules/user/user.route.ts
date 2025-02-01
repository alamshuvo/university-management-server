import { Router } from 'express';
import { UserControllers } from './user.controller';
import { studentValidations } from '../student/student.validation';
import validateRequest from '../../middleWare/validateRequest';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import auth from '../../middleWare/auth';
import { USER_ROLE } from './user.const';
import { userValidation } from './user.validation';


const router = Router();
router.post(
  '/create-student',auth(USER_ROLE.admin),
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);

router.post(
  '/create-faculty',
  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty,
);

router.post("/me",auth(USER_ROLE.student,USER_ROLE.faculty,USER_ROLE.admin),UserControllers.getMe)

router.post("/change-status/:id",auth(USER_ROLE.admin),validateRequest(userValidation.changeValidationSchema),UserControllers.changeStatus)

export const userRoute = router;
