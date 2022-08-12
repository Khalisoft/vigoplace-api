export const dbconfig = {
	type: "mysql",
	host: "localhost",
	port: 3306,
	username: process.env.DATABASE_USERNAME,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME,
	entities: [__dirname + "/entity/*.ts"],
	synchronize: true,
	logging: false,
};
 