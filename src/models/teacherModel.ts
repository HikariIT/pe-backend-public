import { DataTypes, Sequelize } from "sequelize";
import { Teacher } from "../types/models";

export const teacherModelInit = (sequelize: Sequelize) => {
    return Teacher.init({
        teacher_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }, {
        sequelize,
        modelName: "teacher",
        timestamps: false
    })
};