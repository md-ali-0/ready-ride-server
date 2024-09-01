import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../error/AppError';
import { sendEmail } from '../../utils/sendEmail';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { createToken, verifyToken } from './auth.utils';

const signUp = async (payload: IUser) => {
    const { email } = payload;
    const isUserExists = await User.findOne({email});

    if (isUserExists) {
        throw new AppError(httpStatus.CONFLICT, 'User Email Already Exists');
    }

    const result = await User.create(payload);
    return result;
};

const logIn = async (payload: Partial<IUser>) => {
    const { email, password } = payload;

    if (!email || !password) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            'Email and password are required',
        );
    }

    const authUser = await User.isUserExistsByEmail(email as string);

    if (!authUser) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    const isUserPasswordMatched = await bcrypt.compare(
        password,
        authUser.password as string,
    );

    if (!isUserPasswordMatched) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Password is Incorrect');
    }

    const jwtPayload: { email: string; role: string } = {
        email: authUser.email as string,
        role: authUser.role as string,
    };

    const token = await createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expire_in as string,
    );
    const refreshToken = await createToken(
        jwtPayload,
        config.jwt_refresh_secret as string,
        config.jwt_refresh_expire_in as string,
    );

    const user = await User.findOne({ email: authUser.email });

    return { token, refreshToken, user };
};

const changePassword = async (
    userData: JwtPayload,
    payload: { oldPassword: string; newPassword: string },
) => {
    const { oldPassword, newPassword } = payload;

    const user = await User.findById(userData.user);

    // checking if the user is exists
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'The user is not found');
    }

    // checking if user password is matched
    if (!(await User.isUserPasswordMatched(oldPassword, user?.password))) {
        throw new AppError(
            httpStatus.FORBIDDEN,
            'The User password is incorrect',
        );
    }

    const newHasPassword = await bcrypt.hash(newPassword, Number(config.salt));

    await User.findOneAndUpdate(
        {
            id: userData.user,
            role: userData.role,
        },
        {
            password: newHasPassword,
            needChangePassword: false,
            passwordChangeAt: new Date(),
        },
    );

    return null;
};

const getRefreshToken = async (token: string) => {
    // verify token

    const decoded = await verifyToken(
        token,
        config.jwt_refresh_secret as string,
    );

    const { user } = decoded as JwtPayload;

    const authUser = await User.findById(user);

    // checking if the user is exists
    if (!authUser) {
        throw new AppError(httpStatus.NOT_FOUND, 'The user is not found');
    }

    const jwtPayload = { email: authUser.email, role: authUser.role };

    const accessToken = await createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expire_in as string,
    );

    return {
        accessToken,
    };
};

const forgetPassword = async (userId: string) => {
    // checking if the user is exist

    const user = await User.findById(userId);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }

    const jwtPayload = { email: user.email, role: user.role };

    const resetToken = await createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        '10m',
    );

    const resetUILink = `${config.reset_pass_ui_link}?id=${user.id}&token=${resetToken} `;

    sendEmail(user.email, resetUILink);
};

const resetPassword = async (
    payload: { id: string; newPassword: string },
    token: string,
) => {
    // checking if the user is exist
    const user = await User.findById(payload?.id);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }

    const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
    ) as JwtPayload;

    //localhost:3000?id=A-0001&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJBLTAwMDEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDI4NTA2MTcsImV4cCI6MTcwMjg1MTIxN30.-T90nRaz8-KouKki1DkCSMAbsHyb9yDi0djZU3D6QO4

    if (payload.id !== decoded.user) {
        throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden!');
    }

    //hash new password
    const newHashedPassword = await bcrypt.hash(
        payload.newPassword,
        Number(config.salt),
    );

    await User.findOneAndUpdate(
        {
            id: decoded.user,
            role: decoded.role,
        },
        {
            password: newHashedPassword,
            needsPasswordChange: false,
            passwordChangedAt: new Date(),
        },
    );
};


export const AuthService = {
    signUp,
    logIn,
    changePassword,
    getRefreshToken,
    forgetPassword,
    resetPassword,
};
