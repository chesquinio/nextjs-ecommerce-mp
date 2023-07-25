import mongoose, { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        require: true,
        trim: true,
    },
    password: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    cart: {
        type: Array,
        default: []
    } 
})

export const User = models?.User || model('User', UserSchema);