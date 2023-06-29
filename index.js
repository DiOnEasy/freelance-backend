import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename); 

import { registerValidation, loginValidation } from './validations/auth.js';
import { announcementCreateValidation } from './validations/annValidation.js';

import checkAuth from './utils/checkAuth.js';

import * as userController from './controllers/userController.js'
import * as announcementController from './controllers/announcementController.js'
import * as taskController from './controllers/taskController.js'
import * as chatController from './controllers/chatController.js'
import * as messageController from './controllers/messageController.js'

import handleValidationErrors from './utils/handleValidationErrors.js';
import { safely } from './helper.js';

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

app.use(express.static(path.join(__dirname, 'build')));

app.post('/api/task', checkAuth, taskController.createTask)
app.get('/api/orders', checkAuth, taskController.getOrders)
app.patch('/api/orders/:id', checkAuth, taskController.submitOrderDev)

app.post('/api/auth/login', loginValidation, handleValidationErrors, userController.login);
app.post('/api/auth/register', registerValidation, handleValidationErrors, userController.register);
app.get('/api/auth/me', checkAuth, userController.getMe);
app.patch('/api/auth/me', checkAuth, userController.updateMe);


app.post('/api/upload', checkAuth, upload.single('file'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
});

app.get('/api/announcements', announcementController.getAll);
app.get('/api/announce/:id', announcementController.getOne);
app.post('/api/announcements', checkAuth, announcementCreateValidation, handleValidationErrors, announcementController.create);
app.delete('/api/announce/:id', checkAuth, announcementController.remove);
app.patch('/api/announce/:id', checkAuth, announcementCreateValidation, handleValidationErrors, announcementController.update);


app.post('/api/chat', checkAuth, chatController.createChat);
app.get('/api/chat', checkAuth, chatController.getChats);

app.post('/api/message', checkAuth, safely(messageController.addMessage));
app.get('/api/message/:id', checkAuth, safely(messageController.getMessages))
app.get('/api/messages/:id', checkAuth, safely(messageController.getAllMessages))

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

app.listen(4000, (err) => {
    if (err) {
        console.log(err)
    }
    console.log("Server has been started")
})