import {Request, Response} from "express";
import {EnrollStudentRequestBody} from "../types/requests";
import {ClassParams, StudentParams} from "../types/params";
import {IEnrollmentInput} from "../types/models";
import db from "../database";
import {logAndSend, logAndSendError, ResponseCode} from "../util";

const classModel = db.classes;
const studentModel = db.students;
const enrollModel = db.enrolls;

export const getAllStudentIdsForClass = async (req: Request<ClassParams, string>, res: Response<string>) => {
    try {
        const classObj = await classModel.findOne({ where: { class_id: parseInt(req.params.class_id) } })
        if (!classObj)
            return logAndSend(res, ResponseCode.DataNotFound, `Class with id ${req.params.class_id} not found.`);

        const ids = (await enrollModel.findAll({ where: { class_id: parseInt(req.params.class_id) } })).map(e => e.student_id);
        return logAndSend(res, ResponseCode.DefaultSuccesful, ids);
    } catch (err) {
        return logAndSendError(res, ResponseCode.DatabaseError, "Database error", err);
    }
}

export const enrollStudent = async (req: Request<ClassParams, string, EnrollStudentRequestBody>, res: Response<string>) => {
    try {
        const enrollExists = await enrollModel.findOne({ where: {
                class_id: parseInt(req.params.class_id),
                student_id: req.body.student_id
            }
        });
        if (enrollExists)
            return logAndSend(res, ResponseCode.UserExists, `You have already enrolled for this course.`);

        const classObj = await classModel.findOne({ where: { class_id: parseInt(req.params.class_id) } })
        if (!classObj)
            return logAndSend(res, ResponseCode.DataNotFound, `Class with id ${req.params.class_id} not found.`);

        const student = await studentModel.findOne({ where: { student_id: req.body.student_id } });
        if (!student)
            return logAndSend(res, ResponseCode.DataNotFound, `Student with id ${req.params.teacher_id} not found.`);

        const studentsEnrolled = (await enrollModel.findAll({ where: { class_id: parseInt(req.params.class_id) } })).length;

        const enrollInput: IEnrollmentInput = {
            class_id: parseInt(req.params.class_id),
            registration_time: new Date(Date.now()),
            in_queue: studentsEnrolled >= classObj.limit,
            student_id: req.body.student_id
        }

        await enrollModel.create(enrollInput);
        return logAndSend(res, ResponseCode.ResourceCreated, `Enrolled successfully! In queue: ${studentsEnrolled >= classObj.limit}`);
    } catch (err) {
        return logAndSendError(res, ResponseCode.DatabaseError, "Database error", err);
    }
}

export const cancelEnrollForStudent = async (req: Request<ClassParams, string, EnrollStudentRequestBody>, res: Response<string>) => {
    try {
        const classObj = await classModel.findOne({ where: { class_id: parseInt(req.params.class_id) } })
        if (!classObj)
            return logAndSend(res, ResponseCode.DataNotFound, `Class with id ${req.params.class_id} not found.`);

        const student = await studentModel.findOne({ where: { student_id: req.body.student_id } });
        if (!student)
            return logAndSend(res, ResponseCode.DataNotFound, `Student with id ${req.params.teacher_id} not found.`);

        const enroll = await enrollModel.findOne({
            where: {
                class_id: parseInt(req.params.class_id),
                student_id: req.body.student_id
            }
        });
        if (!enroll)
            return logAndSend(res, ResponseCode.DataNotFound, `Student with id ${req.params.teacher_id} didn't enroll in class ${classObj.name}.`);

        await enroll.destroy();
    } catch (err) {
        return logAndSendError(res, ResponseCode.DatabaseError, "Database error", err);
    }
}

export const getAllClassIdsForStudent = async (req: Request<StudentParams, string>, res: Response<string>) => {
    try {
        const student = await studentModel.findOne({ where: { student_id: parseInt(req.params.student_id) } })
        if (!student)
            return logAndSend(res, ResponseCode.DataNotFound, `Student with id ${req.params.student_id} not found.`);

        const ids = (await enrollModel.findAll({ where: { student_id: parseInt(req.params.student_id) } })).map(e => e.class_id);
        return logAndSend(res, ResponseCode.DefaultSuccesful, ids);
    } catch (err) {
        return logAndSendError(res, ResponseCode.DatabaseError, "Database error", err);
    }
}