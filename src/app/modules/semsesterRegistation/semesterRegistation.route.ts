import { Router } from 'express';
import validateRequest from '../../middleWare/validateRequest';
import { semesterRegistationValidation } from './semesterRegistation.validation';
import { SemesterController } from './semesterRegistation.controller';

const router = Router();
router.post(
  '/create-semester-registation',
  validateRequest(
    semesterRegistationValidation.createSemesterRegistationValidation,
  ),
  SemesterController.createSemsesterRegistation,
);

router.get('/:id', SemesterController.getSingleSemsesterRegistation);
router.patch('/:id',validateRequest(semesterRegistationValidation.updateSemesterRegistationValidation), SemesterController.updateSemsesterRegistation);
router.get('/', SemesterController.getAllSemsesterRegistation);

export const semesterRegistationRoute = router;
