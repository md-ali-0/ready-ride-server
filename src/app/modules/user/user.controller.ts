import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import config from '../../config';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserService } from './user.service';

const getProfile = catchAsync(async (req, res) => {
    const { email } = req.user;
    const result = await UserService.getProfile(email);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User profile retrieved successfully',
        data: result,
    });
});

const updateProfile = catchAsync(async (req, res) => {
    const { email } = req.user;
    const payload = {...req.body};

    if (req.body.password) {
        const hashPassword =  await bcrypt.hash(req.body.password, config.salt)
        payload.password = hashPassword
    } else {
        delete payload.password
    }
    const result = await UserService.updateProfile(email, payload);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Profile updated successfully',
        data: result,
    });
});

export const UserController = {
    getProfile,
    updateProfile,
};
