import httpStatus from 'http-status';
import config from '../../config';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthService } from './auth.service';

const signUp = catchAsync(async (req, res) => {
    const payload = req.body;
    const result = await AuthService.signUp(payload);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'User registered successfully',
        data: result,
    });
});

const logIn = catchAsync(async (req, res) => {
    const payload = req.body;
    const { token, refreshToken, user } = await AuthService.logIn(payload);

    res.cookie('refreshToken', refreshToken, {
        secure: config.node_env === 'production',
        httpOnly: true,
    });

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User logged in successfully',
        token: token,
        data: user,
    });
});

const changePassword = catchAsync(async (req, res) => {
    const { ...passwordData } = req.body;

    const result = await AuthService.changePassword(req.user, passwordData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User Password Changed successfully',
        data: result,
    });
});

const getRefreshToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    const result = await AuthService.getRefreshToken(refreshToken);
    const { accessToken } = result;

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Access is retrieved successfully',
        data: { accessToken },
    });
});

const forgetPassword = catchAsync(async (req, res) => {
    const userId = req.body.id;

    const result = await AuthService.forgetPassword(userId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Reset link is generated successfully',
        data: result,
    });
});

const resetPassword = catchAsync(async (req, res) => {
    const payload = req.body;
    const token = req.headers.authorization;

    const result = await AuthService.resetPassword(payload, token as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Password reset succesful!',
        data: result,
    });
});


export const AuthController = {
    signUp,
    logIn,
    changePassword,
    getRefreshToken,
    forgetPassword,
    resetPassword,
};
