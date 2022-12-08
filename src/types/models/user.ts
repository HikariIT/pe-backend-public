import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from "sequelize";

/**
 * Type of user model
 */
export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>>{
    declare user_id?: CreationOptional<number>;
    declare name: string;
    declare surname: string;
    declare password: string;
    declare faculty: string;
    declare group_type: string;
    declare isTeacher: boolean;
    declare email: string;
}
/**
 * Type of object passed to model.create()
 */
export type IUserInput = InferCreationAttributes<User>
/**
 * Type of object returned by to model.findOne(), model.update() ...
 */
export type IUserOutput = InferAttributes<User>
