import jwt from 'jsonwebtoken';

export const createToken = async (
    jwtPayload: { email: string; role: string },
    secret: string,
    expiresTime: string,
) => {
    const token = jwt.sign(jwtPayload, secret as string, {
        expiresIn: expiresTime,
    });

    return token;
};
