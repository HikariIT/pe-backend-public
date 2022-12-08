import { CreationOptional, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { Teacher } from "./teacher";

/**
 * Type of class model
 */
export class Class extends Model<InferAttributes<Class>, InferCreationAttributes<Class>>{
    declare class_id?: CreationOptional<number>;
    declare name: string;
    declare teacher_id: ForeignKey<Teacher["teacher_id"]>
    declare limit: number
    declare start_time: Date
    declare duration: number
}
/**
 * Type of object passed to model.create()
 */
export type IClassInput = InferCreationAttributes<Class>
/**
 * Type of object returned by to model.findOne(), model.update() ...
 */
export type IClassOutput = InferAttributes<Class>
