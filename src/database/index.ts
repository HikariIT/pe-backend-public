import { Sequelize } from "sequelize";
import dbConfig from "../configs/dbConfig";
import sequenceFix from "./util/sequenceFix";
import {
    userModelInit,
    tokenModelInit,
    teacherModelInit,
    studentModelInit,
    opinionModelInit,
    classModelInit,
    enrollmentModelInit
} from '../models';

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool,
    logging: dbConfig.logging,
    dialectOptions: dbConfig.dialectOptions
});

sequelize.authenticate().then(() => {
    console.log(`Database connected to server`);
}).catch((err) => {
    console.log(err);
});

sequenceFix(sequelize).then(() => {
    console.log(`Sequences fixed`);
});

const db = {
    sequelize: sequelize,
    users: userModelInit(sequelize),
    tokens: tokenModelInit(sequelize),
    teachers: teacherModelInit(sequelize),
    students: studentModelInit(sequelize),
    opinions: opinionModelInit(sequelize),
    classes: classModelInit(sequelize),
    enrolls: enrollmentModelInit(sequelize)
};

// Adding associations

db.users.hasOne(db.teachers, { foreignKey: 'user_id' });
db.users.hasOne(db.students, { foreignKey: 'user_id' });

db.students.hasOne(db.opinions, { foreignKey: 'student_id' });
db.students.hasOne(db.enrolls, { foreignKey: 'student_id'})

db.teachers.hasOne(db.classes, { foreignKey: 'teacher_id' });
db.teachers.hasOne(db.opinions, { foreignKey: 'teacher_id' });

db.classes.hasOne(db.enrolls, { foreignKey: 'class_id' });

export default db;