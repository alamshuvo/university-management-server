import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middleWare/validateRequest';
import { studentValidations } from './student.validation';
const router = express.Router();

//will call controller function

router.get('/', StudentControllers.getAllStudents);
router.delete('/:studentId', StudentControllers.deleteStudents);
router.patch(
  '/:studentId',
  validateRequest(studentValidations.createStudentValidationSchemaOptional),
  StudentControllers.updateStudents,
);
router.get('/:studentId', StudentControllers.getSingleStudents);

export const StudentRoutes = router;
