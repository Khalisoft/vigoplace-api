import { Router } from "express";
import authentication from "./routes/authentication";
import users from "./routes/users";
import posts from "./routes/posts";
import messages from "./routes/message";
export const routes = Router();

routes.use("/", [authentication, users, posts, messages ]);
