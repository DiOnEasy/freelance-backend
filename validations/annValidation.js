import { body } from 'express-validator';

export const announcementCreateValidation = [
    body('title', 'Title must be between 3 and 1024 characters').isLength({min:3, max: 1024}).isString(),
    body('description', 'Description must be between 3 and 1024 characters').isLength({min:3, max: 1024}).isString(),
    body('tags', 'Tags are wrong').optional().isString(),
    body('imageUrl', 'Image is unavailable').optional().isURL(),
]