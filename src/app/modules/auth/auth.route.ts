import { Router } from 'express'
import { requestValidation } from '../../middleware/validateRequest'
import { AuthController } from './auth.controller'
import { AuthValidation } from './auth.validation'

const router = Router()

router.post(
    '/signup',
    requestValidation(AuthValidation.signUpValidationSchema),
    AuthController.signUp,
)

router.post(
    '/login',
    requestValidation(AuthValidation.loginValidationSchema),
    AuthController.logIn,
)

export const AuthRoute = router
