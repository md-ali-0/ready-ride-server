import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../error/AppError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { createToken } from './auth.utils';

const signUp = async (payload: IUser) => {
    const result = await User.create(payload);
    return result;
};

const logIn = async (payload: Partial<IUser>) => {
    const { email, password } = payload;

    const authUser = await User.isUserExistsByEmail(email as string);

    if (!authUser) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    const isUserPasswordMatched = await bcrypt.compare(
        password as string,
        authUser.password,
    );

    if (!isUserPasswordMatched) {
        throw new AppError(httpStatus.NOT_FOUND, 'Password is Incorrect');
    }

    const jwtPayload = {
        email: authUser.email,
        role: authUser.role,
    };

    const token = await createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expire_in as string,
    );

    const user = await User.findOne({ email: authUser.email });

    return { token, user };
};

export const AuthService = {
    signUp,
    logIn,
};
