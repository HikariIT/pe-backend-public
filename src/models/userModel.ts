import { DataTypes, Sequelize } from "sequelize";
import { User } from "../types/models";

export const userModelInit = (sequelize: Sequelize) => {
    return User.init({
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        faculty: {
            type: DataTypes.STRING,
            allowNull: false
        },
        group_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isTeacher: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "user",
        timestamps: false
    })
};