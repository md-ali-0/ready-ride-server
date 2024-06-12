import { Router } from "express";
import { auth } from "../../middleware/auth";
import { USER_ROLE } from "./user.constant";
import { UserController } from "./user.controller";

const router = Router()

router.get('/me', auth(USER_ROLE.admin, USER_ROLE.user), UserController.getProfile)
router.put('/me', auth(USER_ROLE.admin, USER_ROLE.user), UserController.updateProfile)

export const UserRoute = router