import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authenticateToken = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (token == null)
		return res
			.sendStatus(401)
			.json({ status: "unauthorized", message: "Authentication Forbidden" });

	jwt.verify(
		token,
		"process.env.JWT_SECRET" as string,
		(err: any, user: any) => {
			// console.log(err);

			if (err)
				return res
					.status(403)
					.json({ status: "forbidden", message: "Authentication Forbidden" });

			req.user = user;

			next();
		}
	);
};
