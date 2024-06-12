import { Router } from "express";
import { auth } from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";
import { BikeController } from "./bike.controller";

const router = Router()

router.post('/', auth(USER_ROLE.admin), BikeController.createBike)
router.put('/:id', auth(USER_ROLE.admin), BikeController.updateBike)
router.delete('/:id', auth(USER_ROLE.admin), BikeController.deleteBike)
router.get('/', BikeController.getAllBikes)

export const BikeRoute = router