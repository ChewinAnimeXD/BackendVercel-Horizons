import { Schema, model } from 'mongoose'

const userSchema = new Schema(
    {
        userIdImage: {type: String},
        image: { type: String },
    },
    {
        timestamps: true
    }
)

export const user = model('UserImage', userSchema)