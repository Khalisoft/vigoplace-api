const { MONGO_URI } = process.env;
export const prefix = "/api/v1"; 
export const MONGO_STRING =
	MONGO_URI ??
	"mongodb+srv://devkhal:devkhal@cluster0.kmma6.gcp.mongodb.net/cab-db?retryWrites=true&w=majority";
export const otpLength = 6;
