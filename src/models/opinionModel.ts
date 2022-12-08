import { DataTypes, Sequelize } from "sequelize";
import { Opinion } from "../types/models";

export const opinionModelInit = (sequelize: Sequelize) => {
    return Opinion.init({
        opinion_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        opinion: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        posted: {
            type: DataTypes.DATE
        }
    }, {
        sequelize,
        modelName: "opinion",
        timestamps: false
    })
};