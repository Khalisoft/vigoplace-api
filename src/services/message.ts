import { AppDataSource } from "../data-source";
import { Message } from "./../entity/Message";

const messageRepo = AppDataSource.getRepository(Message);
const createMessage = async (data: any) => {
	return await messageRepo.save({ ...data });
};

const getUserMessages = async (id: number) => {
	return await messageRepo.find({
		where:[ { sender: id }, { receiver: id } ],
		order: { createdAt: "DESC" },
	});
};



const messages = {
	createMessage,
	getUserMessages
};

export default messages;
