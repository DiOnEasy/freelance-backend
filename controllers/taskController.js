import TaskModel from '../models/Task.js'

export const createTask = async (req, res) => {
    // console.log(req)
    try {
        const doc = new TaskModel({
            task: req.body.taskId,
            customer: req.body.customerId,
            performer: req.userId,
            taskName: req.body.taskName,
            taskDescription: req.body.taskDescription,
            status: 'open',

        });

        const announcement = await doc.save()

        res.json(announcement)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Task creaiting is failed',
        })
    }
}

export const updateTask = async (req, res) => {
    try {
        const annId = req.params.id;
        await AnnouncementModel.updateOne(
            {
                _id: annId,
            },
            {
                title: req.body.title,
                description: req.body.description,
                timeLine: req.body.timeLine,
                file: req.body.file,
                user: req.userId,
                price: req.body.price,
            },
        )
        res.json({
            message: 'Announcement was updated',
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Annoucement updating is failed',
        })
    }
}

export const getOrders = async (req, res) => {

    try{
        const customerId = req.userId;
    
        const orders = await TaskModel.find({customer: {$eq: customerId}, status: {$in: ['open','in development']}}).populate('performer').populate('task');
        res.json(orders)
    }
    catch(err) {

        console.log(err)
        res.status(500).json({
            message: 'Couldn`t find any orders',
        })
    }
}

export const submitOrderDev = async(req,res) =>{
    try {
        const orderId = req.params.id;
        // console.log(req.body.status)
        await TaskModel.updateOne(
            {
                _id: orderId,
            },
            {
                status: req.body.status
            },
        )
        res.json({
            message: 'Announcement was updated',
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Annoucement updating is failed',
        })
    }
}