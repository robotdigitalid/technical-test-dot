import { Sequelize } from 'sequelize';

const db = new Sequelize({
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_DATABASE || 'data',
    username: process.env.DB_USERNAME || 'dev',
    password: process.env.DB_PASSWORD || 'dev',
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'mysql'
});

db.authenticate().then(() => {
    console.log('connected to database!')
}).catch(console.log);

export default db;
