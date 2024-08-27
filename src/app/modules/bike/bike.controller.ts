import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BikeService } from './bike.service';

// Create a new bike

const createBike = catchAsync(async (req, res) => {
    const payload = req.body;
    const result = await BikeService.createBike(req.file, payload);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Bike added successfully',
        data: result,
    });
});

// Update an existing bike

const updateBike = catchAsync(async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await BikeService.updateBike(id, req.file, payload);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Bike updated successfully',
        data: result,
    });
});

// delete an existing bike

const deleteBike = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await BikeService.deleteBike(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Bike deleted successfully',
        data: result,
    });
});

// Retrieve all bikes

const getAllBikes = catchAsync(async (req, res) => {
    const result = await BikeService.getAllBikes(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Bikes retrieved successfully',
        data: result.data,
        meta: result.meta
    });
});

export const BikeController = {
    createBike,
    updateBike,
    deleteBike,
    getAllBikes,
};
