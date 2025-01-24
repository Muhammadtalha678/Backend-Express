import express from 'express'
import {validateRequest} from '../middlewares/validation.middleware.js'
import { loginValidation, registerValidation } from '../utils/validations/auth.validation.js'
import {RegisterController} from '../controllers/auth.controller.js'
import {LoginController} from '../controllers/auth.controller.js'



const router = express.Router()

//register
router.post('/register', validateRequest(registerValidation),RegisterController)


//login 
router.post('/login', validateRequest(loginValidation), LoginController)

export default router