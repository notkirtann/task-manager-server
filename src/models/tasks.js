import mongoose from "mongoose"

const Task = mongoose.model('tasks',{
    description : {
        type: String,
        required : true,
        trim: true,
        minlength: 1
    },
    completed : {
        type: Boolean,
        default : false,
    }
})
export default Task;