import {body, param, query} from "express-validator";

class PostValidator {
    getAllPost(){
        return [
            query('limit')
                .optional()
                .default(10)
                .isInt()
                .withMessage('The limit value should be a number'),
            query('page')
                .optional()
                .default(1)
                .isInt()
                .withMessage('The page value should be a number')
        ]
    }
    getPostById(){
        return [
            param('id')
                .isInt()
                .withMessage('The post id should be a number')
        ]
    }
    createPost(){
        return [
            body('userId')
                .notEmpty()
                .withMessage('The user id is required and cannot be empty')
                .isInt(),
            body('title')
                .notEmpty()
                .withMessage('The title is required and cannot be empty')
                .isString(),
            body('body')
                .isString()
                .withMessage('The body should be a string'),
        ]
    }
    putPost(){
        return [
            body('userId')
                .notEmpty()
                .withMessage('The user id is required and cannot be empty')
                .isInt(),
            body('title')
                .notEmpty()
                .withMessage('The title is required and cannot be empty')
                .isString(),
            body('body')
                .isString()
                .withMessage('The body should be a string'),
            param('id')
                .isInt()
                .withMessage('The post id should be a number')
        ]
    }
    patchPost(){
        return [
            body('title')
                .notEmpty()
                .withMessage('The title is required and cannot be empty')
                .isString(),
            body('body')
                .isString()
                .withMessage('The body should be a string'),
            param('id')
                .isInt()
                .withMessage('The post id should be a number')
        ]
    }
    deletePost(){
        return [
            param('id')
                .isInt()
                .withMessage('The post id should be a number')
        ]
    }
}

const postValidator = new PostValidator();

export default postValidator;
