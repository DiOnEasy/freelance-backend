import MessageModel from '../models/Message.js'
import events from 'events'


const emitter = new events.EventEmitter();
emitter.setMaxListeners(100)

export const addMessage = async (req, res) => {
    // console.log(req)
    try {
        console.log(req.body)
        const doc = new MessageModel({
            message: req.body.message,
            sender: req.userId,
            chat: req.body.chatId
        });

        const message = await doc.save()
        console.log(message)
        emitter.emit('newMessage')
        res.status(200).send("Adding message")
    }
    catch (err) {
        console.log('add')
        console.log(err)
        res.status(500).json({
            message: 'Message adding is failed',
        })
    }
}


export const getAllMessages = async (req, res) => {
    try {
        const chatId = req.params.id;
        // console.log(req.params)
        const messages = await MessageModel.find({ chat: { $eq: chatId }, }).populate('sender');
        // console.log(messages)
        res.json(messages)
    }
    catch (err) {
        console.log('get all')

        console.log(err)
        res.status(500).json({
            message: 'Couldn`t find any messages',
        })
    }
}


export const getMessages = async (req, res) => {
    if (!req.params.id) {
        return
    }
    try {

        emitter.once('newMessage', async () => {
            try {
                const chatId = req.params.id;
                // console.log(req.params)
                const messages = await MessageModel.find({ chat: { $eq: chatId }, }).populate('sender');
                // console.log(messages)
                res.json(messages);
            } catch (err) {
                console.log('get')

                console.log(err)
                res.status(500).json({
                    message: 'Couldn`t find any messages',
                })
            }

        })


    }
    catch (err) {
        console.log('get 123')

        console.log(err)
        res.status(500).json({
            message: 'Couldn`t find any messages',
        })
    }
}

