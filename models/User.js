import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    passwordHash:{
        type: String,
        required: true,
    },
    nickName: String,
    userProfession: String,
    userDescription: String,
    userCountry: String,
    avatar: String,

}, 
{
    timestamps: true,
},
);

export default mongoose.model('User', userSchema);