import { Router } from 'express';
import validateRequest from '../../middleWare/validateRequest';
import { academicDepertment } from './academicDepertment.model';
import { AcademicDepertmentValidation } from './academicDepertment.validation';
import { academicDepertmentController } from './academicDepertment.controllar';

const route = Router();

route.post(
  '/create-academic-depertment',
  validateRequest(AcademicDepertmentValidation.academicDepertmentValidation),
  academicDepertmentController.createAcademicDepertment,
);
route.get('/', academicDepertmentController.getAllAcademicDepertment);
route.get('/:id', academicDepertmentController.getSingleAcademicDepertment);
route.patch(
  '/:id',
  validateRequest(
    AcademicDepertmentValidation.updateAacademicDepertmentValidation,
  ),
  academicDepertmentController.updateAcademicDepertment,
);

export const academicDepertmentRoute = route;
