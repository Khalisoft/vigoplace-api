import { Router } from "express";
import authentication from "../../controllers/authentication";
import { authenticateToken } from "../../middlewares/authentication";

const router = Router();
const { signup, signin, signout } = authentication;

router.post("/authentication/signup", signup);
router.post("/authentication/signin", signin);
router.patch("/authentication/signout", authenticateToken, signout);

export default router;
