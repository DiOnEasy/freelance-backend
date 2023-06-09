import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


import UserModel from '../models/User.js'

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({
                message: 'User is not found' // For changing
            })
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)
        if (!isValidPass) {
            return res.status(400).json({
                message: 'Password is wrong' // For changing
            })
        }

        const token = jwt.sign({
            _id: user._id,
        },
            's',
            {
                expiresIn: '30d'
            })

        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token,
        });

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Authorization is failed'
        })
    }
};

export const register = async (req, res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            passwordHash: hash,
        })

        const user = await doc.save();

        const token = jwt.sign({
            _id: user._id,
        },
            's',
            {
                expiresIn: '30d'
            })

        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token,
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Registration is failed'
        })
    }
};

export const getMe = async (req, res) => {
    console.log(req.userId)
    try {
        const user = await UserModel.findById(req.userId)
        if (!user) {
            return res.status(404).json({
                message: "There is no such user"
            })
        }
        const { passwordHash, ...userData } = user._doc;

        res.json({
            userData,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'There is no access'
        })
    }
};

export const updateMe = async (req, res) => {
    try{
        UserModel.findOneAndUpdate(
            {
                _id: req.userId,
            },
            {
                nickName: req.body.nickName,
                userProfession: req.body.userProfession,
                userDescription: req.body.userDescription,
                userCountry: req.body.userCountry,
                avatar: req.body.avatar,
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
            message: 'Couldn`t update user information',
        })
    }

    
}
