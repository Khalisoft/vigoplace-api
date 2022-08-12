import { Request, Response, NextFunction } from "express";
import postsService from "../services/posts";

const createPost = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const create = await postsService.createPost({
			...req.body,
			poster: req.user.id,
		});
		res.status(201).json({ post: create, message: "Post created" });
	} catch (error) {
		res.status(500).json(error);
		next(error);
	}
};
const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const fetchPosts = await postsService.getAllPosts();
		res.status(200).json({ posts: fetchPosts });
	} catch (error) {
		res.status(500).json(error);
		next(error);
	}
};

const getUserPosts = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const fetchPosts = await postsService.getUserPosts(req.user.id);
		res.status(200).json({ posts: fetchPosts });
	} catch (error) {
		res.status(500).json(error);
		next(error);
	}
};

const getPost = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const fetchPost = await postsService.getPost(+req.params.postId);
		res.status(200).json({ ...fetchPost });
	} catch (error) {
		res.status(500).json(error);
		next(error);
	}
};

const updatePost = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const updatePost = await postsService.updatePost({
			...req.body,
			postId: +req.params.postId,
		});
		res.status(200).json({ ...updatePost });
	} catch (error) {
		res.status(500).json(error);
		next(error);
	}
};

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await postsService.deletePost({
			postId: +req.params.postId,
		});
		res.status(200).json({ message: "Post deleted" });
	} catch (error) {
		res.status(500).json(error);
		next(error);
	}
};

const postsController = {
	createPost,
	getAllPosts,
	getUserPosts,
	getPost,
	updatePost,
	deletePost,
};

export default postsController;
