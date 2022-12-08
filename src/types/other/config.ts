import { Dialect, PoolOptions } from "sequelize";

export interface DBConfig {
    HOST: string,
    USER: string,
    PASSWORD: string,
    DB: string,
    dialect: Dialect,
    pool: PoolOptions
    logging: boolean
    dialectOptions: object
}