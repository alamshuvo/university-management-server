import { Router } from 'express';
import validateRequest from '../../middleWare/validateRequest';
import { authValidation } from './auth.validation';
import { authController } from './auth.controller';
import auth from '../../middleWare/auth';
import { USER_ROLE } from '../user/user.const';

const router = Router();
router.post(
  '/login',
  validateRequest(authValidation.loginValidationSchema),
  authController.loginUser,
);

router.post('/change-password',auth(USER_ROLE.admin,USER_ROLE.student,USER_ROLE.faculty),validateRequest(authValidation.changePasswordValidationSchema),authController.changePassword)


router.post('/refresh-token',validateRequest(authValidation.refreshTokenValidationSchema),authController.refreshToken)

router.post("/forget-password",validateRequest(authValidation.forgetPasswordValidationSchema),authController.forgetPassword)

router.post("/reset-password",validateRequest(authValidation.resetPasswordValidationSchema),authController.resetPassword)

export const authRoute = router;
