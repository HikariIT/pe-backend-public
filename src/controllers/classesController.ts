import db from "../database";
import { logAndSend, logAndSendError, ResponseCode } from "../util";
import { Request, Response } from "express";
import { ClassResponse } from "../types/responses";
import {IClassInput, IClassOutput} from "../types/models";
import {CreateClassRequestBody } from "../types/requests/class";

const classModel = db.classes;
const enrollModel = db.enrolls;

export const getAllClassIds = async (req: Request<any, number[]>, res: Response<number[]>) => {
    try {
        const ids = (await classModel.findAll({ attributes: ['class_id'] })).map(v => v.class_id);
        return logAndSend(res, ResponseCode.DefaultSuccesful, ids);
    } catch (err) {
        return logAndSendError(res, ResponseCode.DatabaseError, "Database error", err);
    }
}

export const createClass = async (req: Request<any, string, CreateClassRequestBody>, res: Response<string>) => {
    try {
        const classInput: IClassInput = {
            name: req.body.name,
            start_time: new Date(req.body.start_time),
            teacher_id: req.body.teacher_id,
            duration: req.body.duration,
            limit: req.body.limit
        }
        const classObj = await classModel.create(classInput);
        return logAndSend(res, ResponseCode.ResourceCreated, `Class created succesfully with id ${classObj.class_id}`);
    } catch (err) {
        return logAndSendError(res, ResponseCode.DatabaseError, "Database error", err);
    }
}

export const getClassFromId = async (req: Request<any, ClassResponse>, res: Response<ClassResponse>) => {
    try {
        const data: IClassOutput | null = await classModel.findOne({ where: { class_id: req.params['class_id'] } });
        if (!data)
            return logAndSend(res, ResponseCode.DataNotFound, `Class with id ${req.params['class_id']} doesn't exist`);

        const studentsEnrolled = (await enrollModel.findAll({ where: { class_id: parseInt(req.params.class_id) } })).length;

        const classResponse: ClassResponse = {
            class_id: data.class_id!,
            name: data.name,
            teacher_id: data.teacher_id!,
            limit: data.limit,
            enrolled: studentsEnrolled,
            start_time: data.start_time.toJSON(),
            duration: data.duration,
        };
        return logAndSend(res, ResponseCode.DefaultSuccesful, classResponse);
    } catch (err) {
        return logAndSendError(res, ResponseCode.DatabaseError, "Database error", err);
    }
}

export const getClassIdsForTeacher = async (req: Request<any, number[]>, res: Response<number[]>) => {
    try {
        const ids = (await classModel.findAll({
            attributes: ['class_id'],
            where: {
                teacher_id: req.params['teacher_id']
            }
        })).map(v => v.class_id);
        return logAndSend(res, ResponseCode.DefaultSuccesful, ids);
    } catch (err) {
        return logAndSendError(res, ResponseCode.DatabaseError, "Database error", err);
    }
}