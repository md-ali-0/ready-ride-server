import { Router } from 'express';
import { requestValidation } from '../../middleware/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = Router();

router.post(
    '/signup',
    requestValidation(AuthValidation.signUpValidationSchema),
    AuthController.signUp,
);

router.post(
    '/login',
    requestValidation(AuthValidation.loginValidationSchema),
    AuthController.logIn,
);

router.post(
    '/change-password',
    requestValidation(AuthValidation.changePasswordValidationSchema),
    AuthController.changePassword,
);

router.post(
    '/refresh-token',
    requestValidation(AuthValidation.refreshTokenValidationSchema),
    AuthController.getRefreshToken,
);

router.post(
    '/forget-password',
    requestValidation(AuthValidation.forgetPasswordValidationSchema),
    AuthController.forgetPassword,
);

router.post(
    '/reset-password',
    requestValidation(AuthValidation.resetPasswordValidationSchema),
    AuthController.resetPassword,
);

export const AuthRoute = router;
