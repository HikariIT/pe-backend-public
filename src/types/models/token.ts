import { InferAttributes, InferCreationAttributes, Model } from "sequelize";

/**
 * Type of token model
 */
export class Token extends Model<InferAttributes<Token>, InferCreationAttributes<Token>>{
    declare token: string;
}
/**
 * Type of object passed to model.create()
 */
export type ITokenInput = InferCreationAttributes<Token>
/**
 * Type of object returned by to model.findOne(), model.update() ...
 */
export type ITokenOutput = InferAttributes<Token>
