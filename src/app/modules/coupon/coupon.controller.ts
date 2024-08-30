import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CouponService } from './coupon.service';

const createCoupon = catchAsync(async (req, res) => {
    const payload = req.body;
    const result = await CouponService.createCoupon(payload);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Rental created successfully',
        data: result,
    });
});

const updateCoupon = catchAsync(async (req, res) => {
    const { id} = req.params
    const result = await CouponService.updateCoupon(id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Rental updated successfully',
        data: result,
    });
});

const deleteCoupon = catchAsync(async (req, res) => {
    const { id} = req.params
    const result = await CouponService.deleteCoupon(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Rental deleted successfully',
        data: result,
    });
});


const allCoupons = catchAsync(async (req, res) => {

    const result = await CouponService.allCoupons(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Rental fetched successfully',
        data: result.data,
        meta: result.meta,
    });
});

const singleCoupon = catchAsync(async (req, res) => {
    const { code } = req.params
    
    const result = await CouponService.singleCoupon(code);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Rental fetched successfully',
        data: result,
    });
});

export const CouponController = {
    createCoupon,
    allCoupons,
    updateCoupon,
    deleteCoupon,
    singleCoupon
};
