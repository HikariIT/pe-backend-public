import {logAndSend, logAndSendError, ResponseCode} from "../util";
import {Request, Response} from "express";
import db from "../database";
import {OpinionResponse} from "../types/responses";
import {IOpinionInput, IOpinionOutput, Opinion} from "../types/models";
import {CreateOpinionRequestBody} from "../types/requests";
import {OpinionParams, StudentParams, TeacherParams} from "../types/params";

const opinionModel = db.opinions;

export const getAllOpinionIds = async (req: Request<any, number[]>, res: Response<number[]>) => {
    try {
        const ids = (await opinionModel.findAll({ attributes: ['opinion_id'] })).map(v => v.opinion_id);
        return logAndSend(res, ResponseCode.DefaultSuccesful, ids);
    } catch (err) {
        return logAndSendError(res, ResponseCode.DatabaseError, "Database error", err);
    }
}

export const getOpinionFromId = async (req: Request<OpinionParams, OpinionResponse | string>, res: Response<OpinionResponse | string>) => {
    try {
        const data: IOpinionOutput | null = await opinionModel.findOne({ where: { opinion_id: req.params.opinion_id } });
        if (!data)
            return logAndSend(res, ResponseCode.DataNotFound, `Opinion with id ${req.params['opinion_id']} doesn't exist`);

        const opinionResponse: OpinionResponse = {
            opinion_id: data.opinion_id!,
            opinion: data.opinion,
            posted: data.posted!.toJSON(),
            teacher_id: data.teacher_id!,
            student_id: data.student_id!
        };
        return logAndSend(res, ResponseCode.DefaultSuccesful, opinionResponse);
    } catch (err) {
        return logAndSendError(res, ResponseCode.DatabaseError, "Database error", err);
    }
}

export const getOpinionIdsForTeacher = async (req: Request<TeacherParams, number[]>, res: Response<number[]>) => {
    try {
        const ids = (await opinionModel.findAll({
            attributes: ['opinion_id'],
            where: {
                teacher_id: parseInt(req.params.teacher_id)
            }
        })).map(v => v.opinion_id);
        return logAndSend(res, ResponseCode.DefaultSuccesful, ids);
    } catch (err) {
        return logAndSendError(res, ResponseCode.DatabaseError, "Database error", err);
    }
}

export const createOpinion = async (req: Request<TeacherParams, string, CreateOpinionRequestBody>, res: Response<string>) => {
    try {
        //TODO: Create Validator
        const opinionInput: IOpinionInput = {
            opinion: req.body.opinion,
            posted: new Date(Date.now()),
            student_id: req.body.student_id,
            teacher_id: parseInt(req.params.teacher_id)
        };
        const opinion = await opinionModel.create(opinionInput);
        return logAndSend(res, ResponseCode.ResourceCreated, `Opinion created succesfully with id ${opinion.opinion_id}`);
    } catch (err) {
        return logAndSendError(res, ResponseCode.DatabaseError, "Database error", err);
    }
}

export const removeOpinion = async (req: Request<OpinionParams, string>, res: Response<string>) => {
    try {
        //TODO: Create Validator
        const opinion: Opinion | null = await opinionModel.findOne({
            where: {
                opinion_id: parseInt(req.params.opinion_id)
            }
        });
        if(!opinion)
            return logAndSend(res, ResponseCode.DataNotFound, "Opinion doesn't exist");

        await opinion.destroy();
        return logAndSend(res, ResponseCode.SuccessNoContent, {});
    } catch (err) {
        return logAndSendError(res, ResponseCode.DatabaseError, "Database error", err);
    }
}

export const getOpinionIdsForStudent = async (req: Request<StudentParams, string>, res: Response<string>) => {
    try {
        try {
            const ids = (await opinionModel.findAll({
                attributes: ['opinion_id'],
                where: {
                    student_id: parseInt(req.params.student_id)
                }
            })).map(v => v.opinion_id);
            return logAndSend(res, ResponseCode.DefaultSuccesful, ids);
        } catch (err) {
            return logAndSendError(res, ResponseCode.DatabaseError, "Database error", err);
        }
    } catch (err) {
        return logAndSendError(res, ResponseCode.DatabaseError, "Database error", err);
    }
}