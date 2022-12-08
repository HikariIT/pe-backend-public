import { logAndSend, logAndSendError, ResponseCode } from "../util";
import { Request, Response } from "express";
import db from "../database";
import { UserResponse } from "../types/responses";
import { StudentParams } from "../types/params";

const studentModel = db.students;
const userModel = db.users;

export const getStudentIds = async (req: Request<any, number[]>, res: Response<number[]>) => {
    try {
        const ids = (await studentModel.findAll({ attributes: ['class_id'] })).map(v => v.student_id);
        return logAndSend(res, ResponseCode.DefaultSuccesful, ids);
    } catch (err) {
        return logAndSendError(res, ResponseCode.DatabaseError, "Database error", err);
    }
}

export const getUserFromStudentId = async (req: Request<StudentParams, UserResponse>, res: Response<UserResponse>) => {
    try {
        const student = await studentModel.findOne({ where: { student_id: parseInt(req.params.student_id) } });
        if (!student)
            return logAndSend(res, ResponseCode.DataNotFound, `Student with id ${req.params.teacher_id} not found.`);

        const user_id = student.user_id
        const user = await userModel.findOne({ where: { user_id: user_id } });
        if (!user) {
            await student.destroy();
            return logAndSend(res, ResponseCode.DataNotFound, `User with id ${user_id} not found.`);
        }

        const userResponse: UserResponse = {
            user_id: user_id!,
            name: user.name,
            surname: user.surname,
            faculty: user.faculty,
            email: user.email,
            group_type: user.group_type,
            isTeacher: false,
            secondary_id: parseInt(req.params.student_id)
        }

        return logAndSend(res, ResponseCode.DefaultSuccesful, userResponse);
    } catch (err) {
        return logAndSendError(res, ResponseCode.DatabaseError, "Database error", err);
    }
}