import { Post } from "./../entity/Post";
import { AppDataSource } from "../data-source";

const postRepo = AppDataSource.getRepository(Post);
const createPost = async (data: any) => {
	return await postRepo.save({ ...data });
};

const getAllPosts = async () => {
	return await postRepo.find({ order: { createdAt: "DESC" } });
};

const getUserPosts = async (id: number) => {
	return await postRepo.find({
		where: { poster: id },
		order: { createdAt: "DESC" },
	});
};

const getPost = async (postId: number) => {
	return await postRepo.findOne({ where: { postId } });
};

const updatePost = async (data: any) => {
	await postRepo.update({ postId: data.postId }, { ...data });
	return await postRepo.findOne({where:{ postId: data.postId }});
};

const deletePost = async (data: any) => {
	return await postRepo.delete({ postId: data.postId });
};

const posts = {
	createPost,
	getAllPosts,
	getUserPosts,
	getPost,
	updatePost,
	deletePost,
};

export default posts;
