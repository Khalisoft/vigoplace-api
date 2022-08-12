import { Request, Response, NextFunction } from "express";
import usersService from "../services/users";
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const getAll = await usersService.getAllUsers();
		res.status(200).json(getAll ? getAll : { message: "No users found" });
	} catch (error) {
		res.status(500).json(error);
		next(error);
	}
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const getUser = await usersService.getUser(req.params.id);
		res.status(200).json(getUser ? getUser : { message: "No user found" });
	} catch (error) {
		res.status(500).json(error);
		next(error);
	}
};

const followUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const follow = await usersService.followUser({
			following: req.params.id,
			follower: req.user.id,
		});
		if (!follow) {
			res.status(200).json({ message: "You cannot follow yourself" });
		} else {
			res.status(200).json({ message: "User Followed", following: follow });
		}
	} catch (error) {
		res.status(500).json(error);
		next(error);
	}
};

const unFollowUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const follow = await usersService.unFollowUser({
			following: req.params.id,
			follower: req.user.id,
		});
		if (!follow) {
			res.status(200).json({ message: "You cannot unfollow yourself" });
		} else {
			res.status(200).json({ message: "User Unfollowed", following: follow });
		}
	} catch (error) {
		res.status(500).json(error);
		next(error);
	}
};

const getFollowers = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const getAll = await usersService.getFollowers(req.user.id);
		res
			.status(200)
			.json(
				getAll && getAll != []
					? { followers: getAll }
					: { message: "You have no followers!" }
			);
	} catch (error) {
		res.status(500).json(error);
		next(error);
	}
};
const getFollowing = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const getAll = await usersService.getFollowing(req.user.id);
		res
			.status(200)
			.json(
				getAll && getAll != []
					? { following: getAll }
					: { message: "You are not following anyone!" }
			);
	} catch (error) {
		res.status(500).json(error);
		next(error);
	}
};

const usersController = {
	getAllUsers,
	getUser,
	followUser,
	unFollowUser,
	getFollowers,
	getFollowing,
};

export default usersController;
