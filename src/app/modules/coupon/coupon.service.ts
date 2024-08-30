import { ICoupon } from './coupon.interface';
import { Coupon } from './coupon.model';

const createCoupon = async (payload: ICoupon): Promise<ICoupon | null> => {
    const results = await Coupon.create(payload);
    return results;
};

const updateCoupon = async (
    id: string,
    payload: ICoupon,
): Promise<ICoupon | null> => {
    const results = await Coupon.findByIdAndUpdate(id, payload);
    return results;
};

const deleteCoupon = async (id: string): Promise<ICoupon | null> => {
    const results = await Coupon.findByIdAndDelete(id);
    return results;
};

const allCoupons = async (): Promise<ICoupon[] | []> => {
    const results = await Coupon.find();
    return results;
};

export const CouponService = {
    createCoupon,
    allCoupons,
    updateCoupon,
    deleteCoupon,
};
