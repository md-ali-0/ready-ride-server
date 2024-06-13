import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../error/AppError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { createToken } from './auth.utils';

const signUp = async (payload: IUser) => {
    const result = await User.create(payload);
    console.log(result);
    
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
    console.log(authUser);
    
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

    const user = await User.findOne({ email: authUser.email });

    return { token, user };
};

export const AuthService = {
    signUp,
    logIn,
};
