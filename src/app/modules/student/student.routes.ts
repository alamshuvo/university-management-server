import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middleWare/validateRequest';
import { studentValidations } from './student.validation';
import auth from '../../middleWare/auth';
import { USER_ROLE } from '../user/user.const';
const router = express.Router();

//will call controller function

router.get('/', StudentControllers.getAllStudents);
router.delete('/:id', StudentControllers.deleteStudents);
router.patch(
  '/:id',
  validateRequest(studentValidations.createStudentValidationSchemaOptional),
  StudentControllers.updateStudents,
);
router.get('/:id',auth(USER_ROLE.admin,USER_ROLE.faculty), StudentControllers.getSingleStudents);

export const StudentRoutes = router;
