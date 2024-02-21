import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: Number,
        required: true,
        trim: true
    },
    identificationNumber:{
        type: Number,
        required: true,
        trim: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['student', 'teacher', 'admin'],
        required: true
    },
    programs: {
        type: [String],
        default: []
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: { 
        type: String 
    }
}, {
    timestamps: true
})

export default mongoose.model('User', userSchema)