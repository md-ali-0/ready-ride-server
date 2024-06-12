import httpStatus from 'http-status'
import { catchAsync } from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AuthService } from './auth.service'

const signUp = catchAsync(async (req, res) => {
    const payload = req.body
    const result = await AuthService.signUp(payload)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'User registered successfully',
        data: result,
    })
})

export const AuthController = {
    signUp,
}
