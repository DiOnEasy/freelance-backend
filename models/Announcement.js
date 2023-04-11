import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    tags:{
        type: Array,
        default: [],
    },
    viewsNum:{
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    avatarUrl: String,

}, 
{
    timestamps: true,
},
);

export default mongoose.model('Announcement', announcementSchema);