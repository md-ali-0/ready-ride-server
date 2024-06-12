import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../error/AppError';
import { IUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';
import { catchAsync } from '../utils/catchAsync';

export const auth = (...requestRoles: IUserRole[]) => {
    return catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            const bearerToken = req.headers.authorization;
            const token = bearerToken?.split(' ')[1];
            if (!token) {
                throw new AppError(
                    httpStatus.UNAUTHORIZED,
                    "You have no access to this route",
                );
            }

            // verify token

            const decoded = jwt.verify(
                token,
                config.jwt_access_secret as string,
            );

            const { email, role, iat } = decoded as JwtPayload;

            const auhUser = await User.isUserExistsByEmail(email);

            // checking if the user is exists
            if (!auhUser) {
                throw new AppError(
                    httpStatus.NOT_FOUND,
                    'The user is not found',
                );
            }

            if (requestRoles && !requestRoles.includes(role)) {
                throw new AppError(
                    httpStatus.UNAUTHORIZED,
                    'You have no access to this route',
                );
            }
            req.user = { email, role };

            next();
        },
    );
};
