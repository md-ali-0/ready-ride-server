import { Router } from 'express';
import { auth } from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import { CouponController } from './coupon.controller';

const router = Router();

router.get(
    '/',
    CouponController.allCoupons,
);

router.post(
    '/:code',
    auth(USER_ROLE.admin, USER_ROLE.user),
    CouponController.singleCoupon,
);

router.put(
    '/:id',
    auth(USER_ROLE.admin),
    CouponController.updateCoupon,
);

router.post(
    '/',
    auth(USER_ROLE.admin),
    CouponController.createCoupon,
);

router.delete(
    '/:id',
    auth(USER_ROLE.admin),
    CouponController.deleteCoupon,
);

export const CouponRoute = router;
