import { CreationOptional, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { User } from "./user";

/**
 * Type of teacher model
 */
export class Teacher extends Model<InferAttributes<Teacher>, InferCreationAttributes<Teacher>>{
    declare teacher_id?: CreationOptional<number>;
    declare user_id: ForeignKey<User["user_id"]>;
}
/**
 * Type of object passed to model.create()
 */
export type ITeacherInput = InferCreationAttributes<Teacher>
/**
 * Type of object returned by to model.findOne(), model.update() ...
 */
export type ITeacherOutput = InferAttributes<Teacher>
