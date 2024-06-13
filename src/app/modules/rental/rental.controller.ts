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

const getAllRentals = catchAsync(async (req, res) => {
    const { email } = req.user;

    const result = await RentalService.getAllRentals(email);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Rentals retrieved successfully',
        data: result,
    });
});

export const RentalController = {
    createRental,
    getAllRentals,
};
