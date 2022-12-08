import * as dotenv from 'dotenv'
import { DBConfig } from "../types/other";

dotenv.config({ path: __dirname + '/../.env' })
const { DB_HOST, DB_USERNAME, DB_PASSWORD } = process.env;

const config: DBConfig = {
    HOST: DB_HOST!,
    USER: DB_USERNAME!,
    PASSWORD: DB_PASSWORD!,
    DB: "ddqcmkcltsm787",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
}

export default config;