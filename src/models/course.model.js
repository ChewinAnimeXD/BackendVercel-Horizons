import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    teacher: {
      type: String,
      required: true,
    },
    students: [{
        username: String,
        idstudent: String,
        email: String,
        phone: Number
    }]
    
}, {
    timestamps: true
});

export default mongoose.model("Course", courseSchema);
