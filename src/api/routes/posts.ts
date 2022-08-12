import { Router } from "express";
import { authenticateToken } from "../../middlewares/authentication";
import postsController from './../../controllers/posts';

const router = Router();

router.post("/posts/create", authenticateToken, postsController.createPost);
router.get("/posts", authenticateToken, postsController.getAllPosts);
router.get("/posts/:postId", authenticateToken, postsController.getPost);
router.get("/posts/user", authenticateToken, postsController.getUserPosts);
router.patch("/posts/:postId/update", authenticateToken, postsController.updatePost);
router.delete("/posts/:postId/delete", authenticateToken, postsController.deletePost);


export default router;