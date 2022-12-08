import { DataTypes, Sequelize } from "sequelize";
import { Class } from "../types/models";

export const classModelInit = (sequelize: Sequelize) => {
    return Class.init({
        class_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        start_time: {
            type: DataTypes.DATE
        },
        limit: {
            type: DataTypes.INTEGER
        },
        duration: {
            type: DataTypes.INTEGER
        },
    }, {
        sequelize,
        modelName: "class",
        timestamps: false
    })
};
