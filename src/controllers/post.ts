import {NextFunction, Request, Response} from "express";
import axios from "axios";
import PostInstance from "../models/post";
import {PostMessage} from "../configs/rabbitmq.config";
import CommentInstance from "../models/comment";

const baseUrl = process.env.API_BASE_URL || '' as string

class PostController {
    async fetchAllPost(req?: Request | PostMessage, res?: Response, next?: NextFunction){
        try {
            const { data } = await axios.get(baseUrl + '/posts');
            const records = await PostInstance.bulkCreate(data, {
                updateOnDuplicate: ['userId', 'title', 'body']
            });
            console.log('fetchAllPost', 'OK', JSON.stringify(records, null, 2));
            if (next) return next();
        } catch (error) {
            console.log('fetchAllPost', 'Fail', error);
            if (next) return next();
        }
    }

    async fetchPostById(req?: Request | PostMessage, res?: Response, next?: NextFunction){
        try {
            const id = req?.params?.id as number;
            const { data } = await axios.get(baseUrl + '/posts/' + id);
            console.log('fetchPostById', 'OK', JSON.stringify(data, null, 2));
            if (next) return next();
        } catch (error) {
            console.log('fetchPostById', 'Fail', error);
            if (next) return next();
        }
    }

    async fetchPostComments(req?: Request | PostMessage, res?: Response, next?: NextFunction){
        try {
            const id = req?.params?.id as number;
            const { data } = await axios.get(baseUrl + '/posts/' + id + '/comments');
            const records = await CommentInstance.bulkCreate(data, {
                updateOnDuplicate: ['postId', 'name', 'email', 'body']
            })
            console.log('fetchPostComments', 'OK', JSON.stringify(records, null, 2));
            if (next) return next();
        } catch (error) {
            console.log('fetchPostComments', 'Fail', error);
            if (next) return next();
        }
    }

    async fetchCreatePost(req?: Request | PostMessage, res?: Response, next?: NextFunction){
        try {
            const { data } = await axios.post(baseUrl + '/posts', req?.body);
            const record = await PostInstance.create(data);
            console.log('fetchCreatePost', 'OK', JSON.stringify(record, null, 2));
            if (next) return next();
        } catch (error) {
            console.log('fetchCreatePost', 'Fail', error);
            if (next) return next();
        }
    }

    async fetchUpdatePost(req?: Request | PostMessage, res?: Response, next?: NextFunction){
        try {
            const id = req?.params?.id as number;
            const { data } = await axios.put(baseUrl + '/posts/' + id, req?.body);
            const record = await PostInstance.update(data, {
                where: {id}
            });
            console.log('fetchAllPost', 'OK', JSON.stringify(record, null, 2));
            if (next) return next();
        } catch (error) {
            console.log('fetchAllPost', 'Fail', error);
            if (next) return next();
        }
    }

    async fetchPatchPost(req?: Request | PostMessage, res?: Response, next?: NextFunction){
        try {
            const id = req?.params?.id as number;
            const { data } = await axios.patch(baseUrl + '/posts/' + id, req?.body);
            const records = await PostInstance.update(data, {
                where: {id},
                fields: ['title', 'body'],
            });
            console.log('fetchAllPost', 'OK', JSON.stringify(records, null, 2));
            if (next) return next();
        } catch (error) {
            console.log('fetchAllPost', 'Fail', error);
            if (next) return next();
        }
    }

    async fetchDeletePost(req?: Request | PostMessage, res?: Response, next?: NextFunction){
        try {
            const id = req?.params?.id as number;
            const { data } = await axios.delete(baseUrl + '/posts/' + id);
            await PostInstance.destroy({
                where: {id},
            });
            console.log('fetchAllPost', 'OK', JSON.stringify(data, null, 2));
            if (next) return next();
        } catch (error) {
            console.log('fetchAllPost', 'Fail', error);
            if (next) return next();
        }
    }

    async getAllPost(req: Request, res: Response){
        try {
            const limit = req.query.limit as number | undefined;
            const page = req.query.page as number | undefined;
            const data = await PostInstance.findAll({
                limit,
                offset: page && limit ? (page - 1) * limit : undefined
            })
            return res.json(data);
        } catch (e) {
            return res.json({
                message: 'Failed to proses your request',
                status: 500,
                route: '/api/v1/posts'
            })
        }
    }

    async getPostById(req: Request, res: Response){
        try {
            const { id } = req.params;
            const data = await PostInstance.findOne({ where: { id } });
            return res.json(data);
        } catch (e) {
            return res.json({
                message: 'Failed to proses your request',
                status: 500,
                route: '/api/v1/posts'
            })
        }
    }

    async createPost(req: Request, res: Response){
        try {
            const data = await PostInstance.create(req.body);
            res.json(data);
        } catch (e) {
            return res.json({
                message: 'Failed to proses your request',
                status: 500,
                route: '/api/v1/posts'
            })
        }
    }

    async putPost(req: Request, res: Response){
        try {
            const { id } = req.params;
            const data = await PostInstance.update(req.body, {where: {id}});
            res.json(data);
        } catch (e) {
            return res.json({
                message: 'Failed to proses your request',
                status: 500,
                route: '/api/v1/posts'
            })
        }
    }

    async patchPost(req: Request, res: Response){
        try {
            const { id } = req.params;
            const { title, body } = req.body;
            const data = await PostInstance.update({title, body}, {where: {id}});
            res.json(data);
        } catch (e) {
            return res.json({
                message: 'Failed to proses your request',
                status: 500,
                route: '/api/v1/posts'
            })
        }
    }

    async deletePost(req: Request, res: Response){
        try {
            const { id } = req.params;
            const data = await PostInstance.destroy({where: {id}});
            res.json(data);
        } catch (e) {
            return res.json({
                message: 'Failed to proses your request',
                status: 500,
                route: '/api/v1/posts'
            })
        }
    }
}

const postController = new PostController();

export default postController;
