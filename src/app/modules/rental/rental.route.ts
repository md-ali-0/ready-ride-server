import { Router } from 'express';
import { auth } from '../../middleware/auth';
import { requestValidation } from '../../middleware/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { RentalController } from './rental.controller';
import { rentalValidation } from './rental.validation';

const router = Router();

router.post(
    '/',
    auth(USER_ROLE.admin, USER_ROLE.user),
    requestValidation(rentalValidation.createRentalValidationSchema),
    RentalController.createRental,
);

router.put('/:id/return', auth(USER_ROLE.admin), RentalController.returnRental);
router.get('/', auth(USER_ROLE.admin, USER_ROLE.user), RentalController.getAllRentals);

export const RentalRoute = router;
