import QueryBuilder from '../../builder/QueryBuilder';
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

const allCoupons = async (query: Record<string, unknown>) => {
    const CouponQuery = new QueryBuilder(Coupon.find(), query)
        .filter()
        .sort()
        .paginate()
        .fields();

    const meta = await CouponQuery.countTotal();
    const data = await CouponQuery.modelQuery;

    return {
        meta,
        data,
    };
};

export const CouponService = {
    createCoupon,
    allCoupons,
    updateCoupon,
    deleteCoupon,
};
