import amqp, {Channel, Connection, Message} from 'amqplib/callback_api';
import postController from "../controllers/post";

const rabbitmqUrl = process.env.RABBITMQ_URL || 'amqp://localhost' as string;

export interface PostMessage {
    path: string
    method: string
    body?: {
        id?: number
        userId?: number
        title?: string
        body?: string
    },
    params?: {
        id?: number
    }
}

const consumer = () => amqp.connect(rabbitmqUrl, function (error0: Error, connection: Connection) {
    if (error0) return console.log('connectToRabbitmq', 'Fail', error0);

    connection.createChannel(function (error1: Error, channel: Channel) {
        if (error1) return console.log('createRabbitmqChannel', 'Fail', error1);

        const queue = 'posts_queue';

        channel.assertQueue(queue, {durable: true});
        // channel.prefetch(1);
        channel.consume(queue, function (message: Message | null) {
            if (message) {
                const msg = message.content.toString() as string;
                const data = JSON.parse(msg) as PostMessage;
                if (data.path === '/posts' && data.method === 'GET' && data.params?.id)
                    return postController.fetchPostById(data);
                if (data.path === '/posts' && data.method === 'GET')
                    return postController.fetchAllPost(data);
                if (data.path === '/comments' && data.method === 'GET')
                    return postController.fetchPostComments(data);
                if (data.path === '/posts' && data.method === 'POST')
                    return postController.fetchCreatePost(data);
                if (data.path === '/posts' && data.method === 'PUT')
                    return postController.fetchUpdatePost(data);
                if (data.path === '/posts' && data.method === 'PATCH')
                    return postController.fetchPatchPost(data);
                if (data.path === '/posts' && data.method === 'DELETE')
                    return postController.fetchDeletePost(data);
            }
        }, {
            noAck: false
        })
    });
});

export default consumer
