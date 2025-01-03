import { Router } from "express";
import validateRequest from "../../middleWare/validateRequest";
import { offeredCourseValidation } from "./offeredCourse.validation";
import { offeredCourseControler } from "./offeredCourse.controller";

const router = Router()

router.post('/create-offered-course',validateRequest(offeredCourseValidation.createOfferedCourseValidation),offeredCourseControler.createOfferedCourse)



export const offeredCourseRouter = router