import { IUser } from './user.interface';
import { User } from './user.model';

const getProfile = async (email: string): Promise<IUser | null> => {
    const user = await User.findOne({ email });
    return user;
};

const allUsers = async (): Promise<IUser[] | []> => {
    const users = await User.find();
    return users;
};

const updateProfile = async (
    email: string,
    payload: Partial<IUser>,
): Promise<IUser | null> => {
    const user = await User.findOneAndUpdate({ email }, payload, { new: true });
    return user;
};

const updateUser = async (
    id: string,
    payload: Partial<IUser>,
): Promise<IUser | null> => {
    const user = await User.findByIdAndUpdate(id, payload, { new: true });
    return user;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
    const result = await User.findByIdAndDelete(id);
    return result;
};


export const UserService = {
    allUsers,
    getProfile,
    updateProfile,
    updateUser,
    deleteUser
};
