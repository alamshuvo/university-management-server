import { Router } from 'express';
import { FacultyControllers } from './faculty.controller';
import validateRequest from '../../middleWare/validateRequest';
import { updateFacultyValidationSchema } from './faculty.validation';
import auth from '../../middleWare/auth';
import { USER_ROLE } from '../user/user.const';

const router = Router();
router.get('/:id', FacultyControllers.getSingleFaculty);
router.patch(
  '/:id',
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:id', FacultyControllers.deleteFaculty);
router.get('/',auth(USER_ROLE.student), FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;
