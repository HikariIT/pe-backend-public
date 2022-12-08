import db from './database';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import express, {Express, Router} from 'express';

import {
    classesRouter,
    enrollRouter,
    opinionsRouter,
    statsRouter,
    studentsRouter,
    teachersRouter,
    usersRouter
} from "./routes";
import { validator } from "./middlewares";
import tokenAuth from "./middlewares/tokenAuth";


export default class App {

    app: Express
    port: number

    constructor(port: number = 8080) {
        this.app = express();
        dotenv.config({ path: __dirname + '/.env' });
        this.app.set('port', process.env.PORT || port);

        this.addMiddlewares();
        this.dbConnect();
        this.addRouters();
    }

    addMiddlewares() {
        // Logger
        this.app.use(morgan('combined'));

        // Express middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));

        // Enable Cross-Origin Resource Sharing
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "http://localhost:3000");
            res.header("Access-Control-Allow-Credentials", "true");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-jwt-token");
            res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
            next();
        });

        this.app.use(cookieParser());
        this.app.use(validator);
        // ... Add any middlewares here
    }

    dbConnect() {
        // Connect to database
        db.sequelize.sync().then(() => {
            console.log("Connected to DB");
        });
    }

    addRouters() {
        this.addRouter('classes', classesRouter, false);
        this.addRouter('enroll', enrollRouter, false);
        this.addRouter('opinions', opinionsRouter, false);
        this.addRouter('stats', statsRouter);
        this.addRouter('students', studentsRouter, false);
        this.addRouter('teachers', teachersRouter, false);
        this.addRouter('users', usersRouter, false);

        // ... Add any routers here
    }

    /**
     * Add a single router with given name
     * @param name used to create url with /api/${name} format
     * @param router router to register
     * @param withAuthentication does the router need token authentication? Defaults to true
     */
    addRouter( name: string, router: Router, withAuthentication: boolean = true) {
        if (withAuthentication)
            this.app.use(`/api/${name}`, tokenAuth);
        this.app.use(`/api/${name}`, router);
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server listening on port ${this.app.get('port')}`);
        });
    }
}