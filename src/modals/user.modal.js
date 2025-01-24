import mongoose from 'mongoose'

const { Schema } = mongoose

const UserSchema = new Schema(
    {
        fullname: { type: String, required: [true,"Full name is required"],trim:true },
        email:{type:String,required:true,unique:true},
        password: { type: String, required: true },
        role:{type:String,enum:['admin','user'],default:"user"}
    },
    {timestamps:true}
)
export const UserModel = mongoose.model('user',UserSchema)