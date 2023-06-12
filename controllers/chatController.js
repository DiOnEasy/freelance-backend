import ChatModel from '../models/Chat.js'

export const createChat = async (req, res) => {
    // console.log(req)
    try {

        const isExisting = await ChatModel.findOne({ customer: { $eq: req.body.customerId || req.userId } });
        if (!isExisting) {
            const doc = new ChatModel({
                customer: req.body.customerId,
                performer: req.userId,
            });

            const chat = await doc.save()

            res.json(chat)
        } else{
            res.json('Chat is existing')
        }

    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Chat creaiting is failed',
        })
    }
}

export const getChats = async (req, res) => {

    try {
        const userId = req.userId;
        const chats = await ChatModel.find({ $or:[{customer : { $eq: userId }}, {performer : { $eq: userId }}] }).populate('customer').populate('performer');
        res.json(chats)
        // console.log(chats)
    }
    catch (err) {

        console.log(err)
        res.status(500).json({
            message: 'Couldn`t find any chats',
        })
    }
}

