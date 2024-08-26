/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { UserRole } from './user.constant';
import { IUser, UserModel } from './user.interface';

const userSchema = new Schema<IUser, UserModel>(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, select: 0 },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        role: { type: String, enum: UserRole, default: 'user' },
    },
    {
        timestamps: true,
        toJSON: {
            transform: function (doc, ret) {
                delete ret.password;
                return ret;
            },
        },
        toObject: {
            transform: function (doc, ret) {
                delete ret.password;
                return ret;
            },
        },
    },
);

// before
userSchema.pre('save', async function (next) {
    const user = this;
    user.password = await bcrypt.hash(this.password, config.salt);
    next();
});

userSchema.static('isUserExistsByEmail', async function (email: string) {
    return await User.findOne({ email }).select('+password');
});

userSchema.static('isUserDeleted', async function (isDeleted) {
    return isDeleted;
});

userSchema.static('isUserBlocked', async function (status: string) {
    return status === 'blocked';
});

userSchema.static(
    'isUserPasswordMatched',
    async function (planePassword, hashPassword) {
        return await bcrypt.compare(planePassword, hashPassword);
    },
);

userSchema.static(
    'isJWTissuedBeforePasswordChange',
    async function (passwordChangeTime: Date, JwtIssuedTime: number) {
        const passwordChangeAtTime =
            new Date(passwordChangeTime).getTime() / 1000;

        return passwordChangeAtTime > JwtIssuedTime;
    },
);
export const User = model<IUser, UserModel>('User', userSchema);