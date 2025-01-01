import { Router } from 'express';
import validateRequest from '../../middleWare/validateRequest';
import { courseValidation } from './course.validation';
import { courseController } from './course.controller';

const router = Router();
router.post(
  '/create-course',
  validateRequest(courseValidation.createCourseValidaion),
  courseController.createCourses,
);

router.get('/:id', courseController.getSingleCourses);
router.get('/', courseController.getAllCourses);
router.patch(
  '/:id',
  validateRequest(courseValidation.updateCourseValidation),
  courseController.updateCourse,
);
router.put("/:courseId/assign-faculties",validateRequest(courseValidation.assignFacultiesValidation),courseController.assignFaculties)

router.delete("/:courseId/remove-faculties",validateRequest(courseValidation.FacultieswithCourseValidation),courseController.removeFaculties)


router.delete('/:id', courseController.deleteSingleCourses);

export const courseRoute = router;
