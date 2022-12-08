import { DataTypes, Sequelize } from "sequelize";
import { Enrollment } from "../types/models";

export const enrollmentModelInit = (sequelize: Sequelize) => {
    return Enrollment.init({
        class_id: {
            type: DataTypes.INTEGER,
        },
        registration_time: {
            type: DataTypes.DATE
        },
        in_queue: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: "enroll",
        timestamps: false
    })
};