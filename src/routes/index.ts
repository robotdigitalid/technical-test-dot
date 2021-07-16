import express from "express";
import postRouter from "./post";

const router = express.Router();

router.use('/posts', postRouter)

export default router;
