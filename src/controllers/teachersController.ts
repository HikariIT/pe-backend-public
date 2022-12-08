import {logAndSend, logAndSendError, ResponseCode} from "../util";
import {Request, Response} from "express";
import db from "../database";
import {TeacherParams} from "../types/params";
import {UserResponse} from "../types/responses";

const teacherModel = db.teachers;
const userModel = db.users;

export const getTeacherIds = async (req: Request<any, number[]>, res: Response<number[]>) => {
    try {
        const ids = (await teacherModel.findAll({ attributes: ['teacher_id'] })).map(v => v.teacher_id);
        return logAndSend(res, ResponseCode.DefaultSuccesful, ids);
    } catch (err) {
        return logAndSendError(res, ResponseCode.DatabaseError, "Database error", err);
    }
}

export const getUserFromTeacherId = async (req: Request<TeacherParams, UserResponse>, res: Response<UserResponse>) => {
    try {
        const teacher = await teacherModel.findOne({ where: { teacher_id: parseInt(req.params.teacher_id) } });
        if (!teacher)
            return logAndSend(res, ResponseCode.DataNotFound, `Teacher with id ${req.params.teacher_id} not found.`);

        const user_id = teacher.user_id
        const user = await userModel.findOne({ where: { user_id: user_id } });
        if (!user) {
            await teacher.destroy();
            return logAndSend(res, ResponseCode.DataNotFound, `User with id ${user_id} not found.`);
        }

        const userResponse: UserResponse = {
            user_id: user_id!,
            name: user.name,
            surname: user.surname,
            faculty: user.faculty,
            email: user.email,
            group_type: user.group_type,
            isTeacher: true,
            secondary_id: parseInt(req.params.teacher_id)
        }

        return logAndSend(res, ResponseCode.DefaultSuccesful, userResponse);
    } catch (err) {
        return logAndSendError(res, ResponseCode.DatabaseError, "Database error", err);
    }
}