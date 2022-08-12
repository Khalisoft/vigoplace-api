import { Router } from "express";
import { authenticateToken } from "../../middlewares/authentication";
import messageController from './../../controllers/message';

const router = Router();

router.post("/messages/create", authenticateToken, messageController.createMessage);
router.get("/messages", authenticateToken, messageController.getUserMessages);



export default router;