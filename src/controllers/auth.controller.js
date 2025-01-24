import { UserModel } from '../modals/user.modal.js'
import { sendRepsonse } from '../helpers/sendResponse.js'
import bcrypt from 'bcrypt'
import { generateTokens } from '../utils/token.js'

export const RegisterController = async (req, res) => {
    try {
     //get value
    const { fullname, email, password } = req.body

    // check user already exists
    const findUser = await UserModel.findOne({ email })
    if (findUser) return sendRepsonse(res, 409, true, "User already exists", null)
    
    // decrypt Password
    const encyptPass = await bcrypt.hash(password, 12)
    
        //save user to db
    const user = await new UserModel({ fullname, email, password: encyptPass }).save()
    return sendRepsonse(res, 200, false, "User Registered", user)   
} catch (error) {
    return sendRepsonse(res, 500, true, error.message,null)   
    
    }
}
export const LoginController = async (req, res) => {
    try {
        // get user data
        const { email, password } = req.body
        
        //find user
        const user = await UserModel.findOne({ email }).lean()
        if (!user) return sendRepsonse(res,401,true,"User not Registered",null)
        
        // decrypt password to check password
        const passwordCheck = await bcrypt.compare(password, user.password)
        if (!passwordCheck) {return sendRepsonse(res, 401, true, "Invalid Credentials", null)}
        
        
        //create token when user find and send data in token
        const { generateAccessToken, generateRefreshToken } = generateTokens(user)
        res.cookie('refreshToken', {
            httpOnly: true,      // Secure the cookie from JavaScript
            secure: true,        // Ensure cookie is sent over HTTPS
        })
        
        return sendRepsonse(res,201,false,'User Login Successfully!',generateAccessToken)
        
    } catch (error) {
        return sendRepsonse(res, 500, true, error.message,null)
    }
     
    
}

