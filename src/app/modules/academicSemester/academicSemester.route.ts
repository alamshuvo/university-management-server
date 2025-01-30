import { Router } from 'express';
import { academicSemesterController } from './academicSemester.controller';
import validateRequest from '../../middleWare/validateRequest';
import { AcademicsemesterValidation } from './academicSemester.validation';
import auth from '../../middleWare/auth';
import { USER_ROLE } from '../user/user.const';

const router = Router();
router.post(
  '/create-academic-semesters',auth(USER_ROLE.admin),
  validateRequest(
    AcademicsemesterValidation.createAcademicSemestarValidationSchema,
  ),
  academicSemesterController.createAcademicSemester,
);
router.get('/',auth("admin"), academicSemesterController.getAcademicSemester);
router.get('/:id', academicSemesterController.getSingleAcademicSemester);
router.patch(
  '/:id',
  validateRequest(
    AcademicsemesterValidation.updateAcademicSemestarValidationSchema,
  ),
  academicSemesterController.updateSingleAcademicSemester,
);

export const AcedemicSemesterRoutes = router;
