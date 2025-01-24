import 'dotenv/config' 

export const envConfig = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    AUTH_SECRET_TOKEN: process.env.AUTH_SECRET_TOKEN,
    REFRESH_SECRET_TOKEN: process.env.REFRESH_SECRET_TOKEN,
}