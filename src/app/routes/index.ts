import { Router } from "express";
import { AuthRoute } from "../modules/auth/auth.route";
import { BikeRoute } from "../modules/bike/bike.route";
import { UserRoute } from "../modules/user/user.route";

const router = Router()

const moduleRoutes = [
    {path: '/auth', route: AuthRoute},
    {path: '/users', route: UserRoute},
    {path: '/bikes', route: BikeRoute},
]

moduleRoutes.forEach(route=> router.use(route.path, route.route))

export default router