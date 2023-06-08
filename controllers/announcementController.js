import AnnouncementModel from "../models/Announcement.js"

export const getAll = async (req, res) => {
    try {
        const announcements = await AnnouncementModel.find().populate('user').exec();

        res.json(announcements)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Couldn`t find any announcement',
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const annId = req.params.id;
        AnnouncementModel.findOneAndUpdate(
            {
                _id: annId,
            },
            {
                $inc: { viewsNum: 1 },
            },
            {
                returnDocument: 'after',
            },
        )
            .then((doc) => {
                if (!doc) {
                    return res.status(404).json({
                        message: 'Couldn`t find announcement'
                    })
                }
                res.json(doc)
            })
            .catch((err) => {
                console.log(err)
                return res.status(500).json({
                    message: 'Couldn`t return announcement',
                })
            })

    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Couldn`t find any announcement',
        })
    }
}

export const remove = async (req, res) => {
    try {
        const annId = req.params.id;
        AnnouncementModel.findOneAndDelete(
            {
                _id: annId,
            },
        )
            .then((doc) => {
                if (!doc) {
                    return res.status(404).json({
                        message: 'Couldn`t find announcement'
                    })
                }
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({
                    message: 'Couldn`t return announcement',
                })
            })
        res.json({
            message: 'Announcement was deleted'
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Couldn`t find any announcement',
        })
    }
}

export const create = async (req, res) => {
    console.log(req)
    try {
        const doc = new AnnouncementModel({
            title: req.body.title,
            description: req.body.description,
            timeLine: req.body.timeLine,
            file: req.body.file,
            user: req.userId,
            price: req.body.price,
        });

        const announcement = await doc.save()

        res.json(announcement)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Annoucement creaiting is failed',
        })
    }
}

export const update = async (req, res) => {
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