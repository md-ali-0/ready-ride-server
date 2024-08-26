import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface IUser {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    role: 'admin' | 'user';
}

export interface UserModel extends Model<IUser> {
    isUserExistsByEmail(email: string): Promise<IUser>;
    isUserBlocked(status: string): Promise<boolean>;
    isUserDeleted(isDeleted: boolean): Promise<boolean>;
    isUserPasswordMatched(
        planePassword: string,
        hashPassword: string,
    ): Promise<boolean>;
    isJWTissuedBeforePasswordChange(
        passwordChangeTime: Date,
        JwtIssuedTime: number,
    ): Promise<boolean>;
}


export type IUserRole = keyof typeof USER_ROLE;
