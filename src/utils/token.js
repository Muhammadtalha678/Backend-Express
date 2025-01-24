import { sendRepsonse } from "../helpers/sendResponse.js"
import jwt from 'jsonwebtoken'
import { envConfig } from "../lib/configs/env.config.js"

const generateAccessToken = (user) => {
 return  jwt.sign(user,envConfig.AUTH_SECRET_TOKEN,{expiresIn:'15m'})  
}

const generateRefreshToken = (user) => {
 return  jwt.sign(user,envConfig.REFRESH_SECRET_TOKEN,{expiresIn:'7d'})  
}

export {generateAccessToken,generateRefreshToken}