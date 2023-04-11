import { body } from 'express-validator';

export const registerValidation = [
    body('email', 'Type of email is incorrect').isEmail(),
    body('password', 'Password must be between 5 and 24 characters').isLength({ min: 5, max: 24 }),
    body('fullName', 'Full Name must be between 3 and 24 characters').isLength({min:3, max: 24}),
    body('avatarUrl', 'Link is unavailable').optional().isURL(),
]

export const loginValidation = [
    body('email', 'Type of email is incorrect').isEmail(),
    body('password', 'Password must be between 5 and 24 characters').isLength({ min: 5, max: 24 }),
]