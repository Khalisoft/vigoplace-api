import { Router } from "express";
import usersController from "../../controllers/users";
import { authenticateToken } from "../../middlewares/authentication";

const router = Router();

router.get("/users/all", authenticateToken, usersController.getAllUsers);
router.get("/users/:id", authenticateToken, usersController.getUser);
router.patch("/users/:id/follow", authenticateToken, usersController.followUser);
router.patch("/users/:id/unfollow", authenticateToken, usersController.unFollowUser);
router.get("/followers", authenticateToken, usersController.getFollowers);
router.get("/following", authenticateToken, usersController.getFollowing);

export default router;
