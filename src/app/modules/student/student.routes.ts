import express from 'express';
import { StudentControllers } from './student.controller';
const router = express.Router();

//will call controller function

router.get('/', StudentControllers.getAllStudents);
router.delete('/:studentId', StudentControllers.deleteStudents);
router.patch('/:studentId',StudentControllers.updateStudents)
router.get('/:studentId', StudentControllers.getSingleStudents);

export const StudentRoutes = router;
