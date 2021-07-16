require('dotenv').config();

import router from "./routes";
import express, {Request, Response} from 'express';
import db from "./configs/database.config";
import consumer from "./configs/rabbitmq.config";

const port = 9000;

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req: Request, res: Response) => res.send('Hello World'));
app.use('/api/v1', router);

app.listen(port, () => {
    console.log('Server is running on port', port);
})

db.sync().then(() => console.log('Table updated!')).catch(console.log);
consumer();
