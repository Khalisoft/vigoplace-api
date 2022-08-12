import { Request, Response, NextFunction } from "express";
import authenticationService from "../services/authentication";
export const signup = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const saveUser = await authenticationService.signup(req.body);
		saveUser.password = undefined;
		saveUser.updatedAt = undefined;
		res.status(201).json(saveUser);
	} catch (error) {
		res.status(500).json(error);
		next(error);
	}
};

export const signin = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const getUser = await authenticationService.signin(req.body);
		if (!getUser) {
			res.status(404).json({ status: "failed", message: "User not found" });
		} else {
			res
				.status(200)
				.json({ status: "success", message: "Logged in", ...getUser });
		}
	} catch (error) {
		res.status(500).json(error);
		next(error);
	}
};
export const signout = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		res
			.status(200)
			.json({ status: "success", message: "Logged out"});
	} catch (error) {
		res.status(500).json(error)
		next(error);
	}
};

const authenticationController = { signup, signin, signout };

export default authenticationController;
