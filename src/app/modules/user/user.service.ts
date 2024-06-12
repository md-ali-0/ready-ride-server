import { IUser } from './user.interface'
import { User } from './user.model'

const getProfile = async (email: string) => {
    const user = await User.findOne({ email })
    return user
}

const updateProfile = async (email: string, payload: Partial<IUser>) => {
    const user = await User.findOneAndUpdate({ email }, payload, { new: true })
    return user
}

export const UserService = {
    getProfile,
    updateProfile,
}
