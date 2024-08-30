import { NextFunction, Request, Response, Router } from 'express';
import { auth } from '../../middleware/auth';
import { requestValidation } from '../../middleware/validateRequest';
import { upload } from '../../utils/sendImageToCloudinary';
import { USER_ROLE } from '../user/user.constant';
import { BikeController } from './bike.controller';
import { BikeValidation } from './bike.validation';

const router = Router();

router.post(
    '/',
    auth(USER_ROLE.admin),
    upload.single('image'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data);
        next();
    },
    requestValidation(BikeValidation.createBikeValidationSchema),
    BikeController.createBike,
);
router.put(
    '/:id',
    auth(USER_ROLE.admin),
    upload.single('image'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data);
        next();
    },
    requestValidation(BikeValidation.updateBikeValidationSchema),
    BikeController.updateBike,
);

router.delete('/:id', auth(USER_ROLE.admin), BikeController.deleteBike);
router.get('/', BikeController.getAllBikes);
router.get('/:id', BikeController.getSingleBike);

export const BikeRoute = router;
