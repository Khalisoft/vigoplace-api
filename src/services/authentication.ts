import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import { decryptPassword, encryptPassword } from "../utils/password";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const userRepo = AppDataSource.getRepository(User);
const signup = async (data: any) => {
	const password = await encryptPassword(data.password);
	return await userRepo.save({ ...data, password: password });
};

const signin = async (data: any) => {
	const check = await userRepo.findOne({ where: { username: data.username } });
	if (!check) {
		return null;
	} else {
		const validate = await decryptPassword({
			password: data.password,
			databasePassword: check.password,
		});
		if (validate) {
			const token = jwt.sign(
				{ id: check.id, username: check.username },
				"process.env.JWT_SECRET",
				{ expiresIn: "7d" }
			);
			return { id: check.id, username: check.username, token: token };
		}
	}
};

const authentication = { signup, signin };

export default authentication;
