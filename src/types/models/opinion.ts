import { CreationOptional, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { Student } from "./student";
import { Teacher } from "./teacher";

/**
 * Type of opinion model
 */
export class Opinion extends Model<InferAttributes<Opinion>, InferCreationAttributes<Opinion>>{
    declare opinion_id?: CreationOptional<number>;
    declare opinion: string;
    declare student_id: ForeignKey<Student["student_id"]>;
    declare teacher_id: ForeignKey<Teacher["teacher_id"]>;
    declare posted?: CreationOptional<Date>;
}
/**
 * Type of object passed to model.create()
 */
export type IOpinionInput = InferCreationAttributes<Opinion>
/**
 * Type of object returned by to model.findOne(), model.update() ...
 */
export type IOpinionOutput = InferAttributes<Opinion>
