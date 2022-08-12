import express, { Express, Request, Response } from "express";
import { prefix } from "./../configs/index";
import { routes } from "./../api/index";
import bodyParser from "body-parser";
import { Server } from "socket.io";
import { createServer } from 'http';

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
	res.send("<h1>Vigoplace Full Stack Assessment Test!</h1>");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(prefix, routes);

const server = createServer(app);
const io = new Server(server)

io.on("connection", (socket) =>{

	console.log("New client connected");
	socket.on("disconnect", () => {
		console.log("Client disconnected");
	} );
});

export { app }; 
