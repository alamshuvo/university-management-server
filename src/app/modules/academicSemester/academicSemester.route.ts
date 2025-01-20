import { Router } from 'express';
import { academicSemesterController } from './academicSemester.controller';
import validateRequest from '../../middleWare/validateRequest';
import { AcademicsemesterValidation } from './academicSemester.validation';
import auth from '../../middleWare/auth';

const router = Router();
router.post(
  '/create-academic-semester',
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
