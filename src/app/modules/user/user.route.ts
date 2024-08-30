import { Router } from 'express';
import { auth } from '../../middleware/auth';
import { USER_ROLE } from './user.constant';
import { UserController } from './user.controller';

const router = Router();

router.get(
    '/me',
    auth(USER_ROLE.admin, USER_ROLE.user),
    UserController.getProfile,
);

router.get(
    '/',
    auth(USER_ROLE.admin),
    UserController.allUsers,
);

router.patch(
    '/:id',
    auth(USER_ROLE.admin),
    UserController.updateUser,
);

router.put(
    '/me',
    auth(USER_ROLE.admin, USER_ROLE.user),
    UserController.updateProfile,
);

router.delete(
    '/:id',
    auth(USER_ROLE.admin),
    UserController.deleteUser,
);

export const UserRoute = router;
