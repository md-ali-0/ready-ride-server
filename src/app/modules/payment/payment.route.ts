import { Router } from 'express';
import { auth } from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import { PaymentController } from './payment.controller';

const router = Router();

router.post(
    '/create-payment-intent',
    auth(USER_ROLE.admin, USER_ROLE.user),
    PaymentController.createPaymentIntent,
);

export const PaymentRoute = router;
