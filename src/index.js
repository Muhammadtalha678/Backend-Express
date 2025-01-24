import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { dbConnect } from './lib/db/dbConnection.js'
import { envConfig } from './lib/configs/env.config.js'
import AuthRouter from './routers/auth.router.js'
import UserRouter from './routers/users.router.js'

const app = express()
app.use(express.json())
app.use(cors("*"))
app.use(morgan("tiny"))

app.use(express.json())


app.get('/', (req,res) => {
    res.send("Hello world")
})

dbConnect()
    .then(() => {
         app.use('/auth',AuthRouter)
        app.use('/users',UserRouter)
        app.listen(envConfig.PORT, () => {
            console.log("App running on Port 5000"); 
        })
    
}).catch((error)=>console.log("error =>",error)
)
