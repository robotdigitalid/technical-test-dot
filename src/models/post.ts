import {DataTypes, Model} from 'sequelize';
import db from "../configs/database.config";

interface PostAttributes {
    id: number
    userId: number
    title: string
    body: string
}

class PostInstance extends Model<PostAttributes> {}

PostInstance.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    title: {
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

export default PostInstance;
