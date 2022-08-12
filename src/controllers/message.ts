import { Request, Response, NextFunction } from "express";
import messageService from "../services/message";

const createMessage = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await messageService.createMessage({
			...req.body,
			sender: req.user.id,
		});
		res.status(201).json({ message: "Message Sent" });
	} catch (error) {
		res.status(500).json(error);
		next(error);
	}
};
const getUserMessages = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const fetchmessages = await messageService.getUserMessages(req.user.id);
		res.status(200).json({ messages: fetchmessages });
	} catch (error) {
		res.status(500).json(error);
		next(error);
	}
};


const postsController = {
	createMessage,
	getUserMessages,
	
};

export default postsController;
