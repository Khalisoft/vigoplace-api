import { AppDataSource } from "./data-source";
import { app } from "./loaders/express";
import { User } from "./entity/User";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });
AppDataSource.initialize().then(async () => {
const port = process.env.PORT || 8080;

app.listen(port, () => {
	console.log(`Vigoplace Social Server is running on port ${port}`);
});

}).catch(error => console.log(error))
