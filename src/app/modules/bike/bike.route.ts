import { Router } from 'express';
import { auth } from '../../middleware/auth';
import { requestValidation } from '../../middleware/validateRequest';
import { USER_ROLE } from '../user/user.constant';
import { BikeController } from './bike.controller';
import { BikeValidation } from './bike.validation';

const router = Router();

router.post(
    '/',
    auth(USER_ROLE.admin),
    requestValidation(BikeValidation.createBikeValidationSchema),
    BikeController.createBike,
);
router.put(
    '/:id',
    auth(USER_ROLE.admin),
    requestValidation(BikeValidation.updateBikeValidationSchema),
    BikeController.updateBike,
);
router.delete('/:id', auth(USER_ROLE.admin), BikeController.deleteBike);
router.get('/', BikeController.getAllBikes);

export const BikeRoute = router;
