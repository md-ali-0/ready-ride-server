import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RentalService } from './rental.service';

const createRental = catchAsync(async (req, res) => {
    const user = req.user;
    const payload = req.body;
    const result = await RentalService.createRental(user, payload);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Rental created successfully',
        data: result,
    });
});

const returnRental = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await RentalService.returnRental(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Bike returned successfully',
        data: result,
    });
});

const getAllRentals = catchAsync(async (req, res) => {
    const { email } = req.user;

    const result = await RentalService.getAllRentals(email, req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Rentals retrieved successfully',
        data: result.data,
        meta: result.meta,
    });
});

export const RentalController = {
    createRental,
    returnRental,
    getAllRentals,
};
