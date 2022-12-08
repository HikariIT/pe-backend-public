import { DataTypes, Sequelize } from "sequelize";
import { Token } from "../types/models";

export const tokenModelInit = (sequelize: Sequelize) => {
    return Token.init({
        token: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "token",
        timestamps: false
    })
};