import { CreationOptional, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { Student } from "./student";
import { Class } from "./class";

/**
 * Type of class model
 */
export class Enrollment extends Model<InferAttributes<Enrollment>, InferCreationAttributes<Enrollment>>{
    declare enrollment_id?: CreationOptional<number>;
    declare class_id: ForeignKey<Class["class_id"]>
    declare student_id: ForeignKey<Student["student_id"]>;
    declare registration_time: Date;
    declare in_queue: CreationOptional<boolean>;
}
/**
 * Type of object passed to model.create()
 */
export type IEnrollmentInput = InferCreationAttributes<Enrollment>
/**
 * Type of object returned by to model.findOne(), model.update() ...
 */
export type IEnrollmentOutput = InferAttributes<Enrollment>
