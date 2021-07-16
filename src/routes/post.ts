import express from "express";
import postValidator from "../validators/post";
import postController from "../controllers/post";
import middleware from "../middleware";

const router = express.Router();

router.get(
    '/',
    postValidator.getAllPost(),
    middleware.handleValidationError,
    postController.fetchAllPost,
    postController.getAllPost
);

router.get(
    '/:id',
    postValidator.getPostById(),
    middleware.handleValidationError,
    postController.getPostById
);

router.post(
    '/',
    postValidator.createPost(),
    middleware.handleValidationError,
    postController.createPost
);

router.put(
    '/:id',
    postValidator.putPost(),
    middleware.handleValidationError,
    postController.putPost
);

router.patch(
    '/:id',
    postValidator.patchPost(),
    middleware.handleValidationError,
    postController.patchPost
);

router.delete(
    '/:id',
    postValidator.deletePost(),
    middleware.handleValidationError,
    postController.deletePost
);

export default router;
