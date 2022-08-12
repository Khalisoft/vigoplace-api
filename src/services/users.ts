import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import dotenv from "dotenv";

dotenv.config();

const userRepo = AppDataSource.getRepository(User);
const getAllUsers = async () => {
	return await userRepo.find({
		select: [
			"id",
			"username",
			"firstName",
			"lastName",
			"followers",
			"following",
		],
	});
};

const getUser = async (id: any) => {
	return await userRepo.findOne({
		where: { id: id },
		select: [
			"id",
			"username",
			"firstName",
			"lastName",
			"followers",
			"following",
		],
	});
};

const followUser = async (data: any) => {
	const { following, follower } = data;
	if (+following === +follower) {
		return null;
	}

	const toFollow = await userRepo.findOne({ where: { id: following } });
	const Followeeing = await userRepo.findOne({ where: { id: follower } });
	const followers = toFollow?.followers; //follower list of the user to follow
	const followees = Followeeing?.following; //followee list of the user who is following
	if (!followers?.includes(+follower)) {
		followers?.push(+follower);
	}
	if (!followees?.includes(+following)) {
		followees?.push(+following);
	}

	let filteredFollowers = [...new Set(followers)];
	let filteredFollowees = [...new Set(followees)];

	await userRepo.update({ id: following }, { followers: filteredFollowers });
	await userRepo.update({ id: follower }, { following: filteredFollowees });
	const followingList = await userRepo.findOne({
		where: { id: follower },
		select: ["following"],
	});
	return followingList?.following;
};

const unFollowUser = async (data: any) => {
	const { following, follower } = data;
	if (+following === +follower) {
		return null;
	}

	const toUnfollow = await userRepo.findOne({ where: { id: following } });
	const Followeeing = await userRepo.findOne({ where: { id: follower } });
	const followers = toUnfollow?.followers; //follower list of the user to unfollow
	const followees = Followeeing?.following; //followee list of the user who is unfollowing

	const remainingFollowers = followers?.filter((data) => data != +follower);
	const remainingFollowings = followees?.filter((data) => data != +following);

	let filteredFollowers = [...new Set(remainingFollowers)];
	let filteredFollowees = [...new Set(remainingFollowings)];

	await userRepo.update({ id: following }, { followers: filteredFollowers });
	await userRepo.update({ id: follower }, { following: filteredFollowees });
	const followingList = await userRepo.findOne({
		where: { id: follower },
		select: ["following"],
	});
	return followingList?.following;
};

const getFollowers = async (id: number) => {
	const followers = await userRepo.findOne({ where: { id }, select: ["followers"] });
	return followers?.followers;
};

const getFollowing = async (id: number) => {
	const following = await userRepo.findOne({ where: { id }, select: ["following"] });
	return following?.following;
};

const authentication = {
	getAllUsers,
	getUser,
	followUser,
	unFollowUser,
	getFollowers,
	getFollowing,
};

export default authentication;
