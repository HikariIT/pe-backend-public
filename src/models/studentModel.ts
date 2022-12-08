import { DataTypes, Sequelize } from "sequelize";
import { Student } from "../types/models";

export const studentModelInit = (sequelize: Sequelize) => {
    return Student.init({
        student_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }, {
        sequelize,
        modelName: "student",
        timestamps: false
    })
};