import { Schema, model } from 'mongoose'
import { UserRole } from './user.constant'
import { IUser } from './user.interface'

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        role: { type: String, enum: UserRole, default: 'user' },
    },
    { versionKey: false, timestamps: true },
)

export const User = model<IUser>('User', userSchema)
