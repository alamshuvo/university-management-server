import { Router } from "express";
import validateRequest from "../../middleWare/validateRequest";
import { academicFacultyValidation } from "./academicFaculty.validation";
import { academicFacultyController } from "./academicFaculty.controllar";

const route = Router()
route.post("/create-academic-faculty",validateRequest(academicFacultyValidation.createAcademicFacultyValidationSchema),academicFacultyController.createAcademicFaculty);
route.get("/",academicFacultyController.getAllAcademicFaculty)
route.get("/:id",academicFacultyController.getSingleAcademicFaculty)
route.patch("/:id",academicFacultyController.updateAcademicFaculty)

export const academicFacultyRoute = route