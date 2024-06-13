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
    isUserExistsByEmail(email: string): Promise<Partial<IUser>>;
}

export type IUserRole = keyof typeof USER_ROLE;
