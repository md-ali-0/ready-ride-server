import { Response } from 'express';

interface IResponse<X> {
    statusCode: number;
    success: boolean;
    message: string;
    token?: string;
    data: X;
}

const isEmpty = (data: any): boolean => {
    if (Array.isArray(data)) {
        return data.length === 0;
    } else if (data && typeof data === 'object') {
        return Object.keys(data).length === 0;
    }
    return !data;
};

const sendResponse = async <X>(res: Response, data: IResponse<X>) => {
    if (isEmpty(data.data)) {
        return res.status(data.statusCode).json({
            success: false,
            message: 'No Data Found',
            data: data.data,
        });
    }
    return res.status(data.statusCode).json({
        success: data.success,
        message: data.message,
        data: data.data,
    });
};

export const sendResponseWithToken = async <X>(
    res: Response,
    data: IResponse<X>,
) => {
    return res.status(data.statusCode).json({
        success: data.success,
        message: data.message,
        token: data.token,
        data: data.data,
    });
};

export default sendResponse;
