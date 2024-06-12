import bcrypt from 'bcrypt'
import { Schema, model } from 'mongoose'
import config from '../../config'
import { UserRole } from './user.constant'
import { IUser, UserModel } from './user.interface'

const userSchema = new Schema<IUser, UserModel>(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true},
        password: { type: String, required: true, select: 0 },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        role: { type: String, enum: UserRole, default: 'user' },
    },
    { timestamps: true },
)

userSchema.pre('save', async function (next) {
    const user = this
    user.password = await bcrypt.hash(this.password, config.salt)
    next()
})

userSchema.static('isUserExistsByEmail', async function (email: string) {
    return await User.findOne({ email })
})

export const User = model<IUser, UserModel>('User', userSchema)
