import mongoose from "mongoose";

const calificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course.students',
    required: true,
},
course: {
  type:String,
  required:true,
},
name: {
        type: String,
        required: true,
    },
    calification: {
      type: String,
      required: true,
    },
    comment: {
        type: String,
        required: false,
      },
    
}, {
    timestamps: true
});

export default mongoose.model("Calification", calificationSchema);
