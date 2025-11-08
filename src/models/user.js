import mongoose from "mongoose"
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Write valid email')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error('You don\'t satisfy password criteria')
            }
        }
    },
    address :[{
        city : {
            type: String,
            required: true,
            trim: true,
        },
        state : {
            type: String,
            required: true,
            trim: true,
        },
        pincode : {
            type: Number,
            required: true,
        }
    }],
    phoneNumber : [{
        mainNum : {
            type: String,
            required : true,
            trim: true,
            validate(value) {
            if (!validator.isMobilePhone(value)) {
                throw new Error('Write valid number')
                }
            }
        },
        altNum : {
            type: String,
            default : '',
            trim : true,
            validate(value) {
            if (!validator.isMobilePhone(value)) {
                throw new Error('Write valid number')
                }
            }
        } 
    }],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})

    if (!user) {
        throw new Error('unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user;
}

userSchema.methods.genAuthToken = async function() {
    const user = this
    const jwtToken = jwt.sign(
        {_id: user._id.toString(), email: user.email}, 
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN || '7d'}
    ) 
    user.tokens = user.tokens.concat({token: jwtToken})
    await user.save()
    return jwtToken
}


//plain text to hash
userSchema.pre('save', async function(next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }    
    next()
})

const User = mongoose.model('User', userSchema)

export default User;