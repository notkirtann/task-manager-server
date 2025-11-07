import mongoose from "mongoose"
import validator from 'validator'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    age :{
        type: Number,
        default: 0
    },
    email :{
        type : String,
        unique : true,
        required : true,
        trim : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ('write valid email')
            }
        }
    },
    password :{
        type : String,
        required : true,
        trim : true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error('you dont satisfy password criteria')
            }
        }
    }
})
userSchema.statics.findByCredentials = async(email,password)=>{
    const user = await User.findById({email})

    if(!user){
        throw new Error ('unable to login')
    }
    const isMatch = await bcrypt.compare.hash(password,user.password)

    if(!isMatch){
        throw new Error('Unable to login')
    }

    return user;

}

//plain text to hasg
userSchema.pre('save',async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }    

    next()
})

const User = mongoose.model('Users',userSchema)

export default User;