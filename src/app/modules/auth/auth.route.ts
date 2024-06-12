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

export const AuthRoute = router
