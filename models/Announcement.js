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
    timeLine:{
        type: Number,
        required: true,
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
    price:{
        type: Number,
        required: true,
    },

}, 
{
    timestamps: true,
},
);

export default mongoose.model('Announcement', announcementSchema);