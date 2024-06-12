import httpStatus from 'http-status'
import { catchAsync } from '../../utils/catchAsync'
import sendResponse, { sendResponseWithToken } from '../../utils/sendResponse'
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

const logIn = catchAsync(async (req, res) => {
    const payload = req.body
    const { token, user }  = await AuthService.logIn(payload)

    sendResponseWithToken(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User logged in successfully',
        token: token,
        data: user,
    })
})

export const AuthController = {
    signUp,
    logIn
}
