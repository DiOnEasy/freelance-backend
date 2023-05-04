import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors'

import { registerValidation, loginValidation } from './validations/auth.js';
import { announcementCreateValidation } from './validations/annValidation.js';

import checkAuth from './utils/checkAuth.js';

import * as userController from './controllers/userController.js'
import * as announcementController from './controllers/announcementController.js'

import handleValidationErrors from './utils/handleValidationErrors.js';

mongoose
    .connect('mongodb+srv://DiOnEasy:wwwwww@cluster0.oxv0cbk.mongodb.net/freelance-exchange?retryWrites=true&w=majority',)
    .then(() => console.log('DB OK'))
    .catch((err) => console.log('DB err', err));

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage })

app.use(express.json());
app.use('/uploads', express.static('uploads'))
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello nahui');
})

app.post('/auth/login', loginValidation, handleValidationErrors, userController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, userController.register);
app.get('/auth/me', checkAuth, userController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
});

app.get('/announcements', announcementController.getAll);
app.get('/announcements/:id', announcementController.getOne);
app.post('/announcements', checkAuth, announcementCreateValidation, handleValidationErrors, announcementController.create);
app.delete('/announcements/:id', checkAuth, announcementController.remove);
app.patch('/announcements/:id', checkAuth, announcementCreateValidation, handleValidationErrors, announcementController.update);


app.listen(4000, (err) => {
    if (err) {
        console.log(err)
    }
    console.log("Server has been started")
})