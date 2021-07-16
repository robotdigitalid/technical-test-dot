import {DataTypes, Model} from 'sequelize';
import db from "../configs/database.config";

interface CommentAttributes {
    id: number
    postId: number
    name: string
    email: string
    body: string
}

class CommentInstance extends Model<CommentAttributes> {}

CommentInstance.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    postId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    body: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize: db,
    tableName: 'posts',
    paranoid: true
});

export default CommentInstance;
