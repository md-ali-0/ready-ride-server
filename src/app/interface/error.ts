export interface IErrorSources {
    path: string | number;
    message: string;
}

export type IGenericError = {
    statusCode: number;
    message: string;
    errorSources: IErrorSources[];
};
