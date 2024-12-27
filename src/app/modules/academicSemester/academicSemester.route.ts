import { Router } from "express";
import { academicSemesterController } from "./academicSemester.controller";
import validateRequest from "../../middleWare/validateRequest";
import { AcademicsemesterValidation } from "./academicSemester.validation";

const router =Router()
router.post("/create-academic-semester",validateRequest(AcademicsemesterValidation.createAcademicSemestarValidationSchema),academicSemesterController.createAcademicSemester)

export const AcedemicSemesterRoutes = router