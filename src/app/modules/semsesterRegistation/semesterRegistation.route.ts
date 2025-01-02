import { Router } from "express";
import validateRequest from "../../middleWare/validateRequest";
import { semesterRegistationValidation } from "./semesterRegistation.validation";

const router = Router();
router.post('/create-semester-registation',validateRequest(semesterRegistationValidation.createSemesterRegistationValidation),)