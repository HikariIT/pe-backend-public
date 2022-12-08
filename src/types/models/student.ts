import { CreationOptional, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { User } from "./user";

/**
 * Type of student model
 */
export class Student extends Model<InferAttributes<Student>, InferCreationAttributes<Student>>{
    declare student_id?: CreationOptional<number>;
    declare user_id: ForeignKey<User["user_id"]>;
}
/**
 * Type of object passed to model.create()
 */
export type IStudentInput = InferCreationAttributes<Student>
/**
 * Type of object returned by to model.findOne(), model.update() ...
 */
export type IStudentOutput = InferAttributes<Student>
