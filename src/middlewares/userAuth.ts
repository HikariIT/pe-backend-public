import db from '../database'
import { NextFunction, Request, Response } from "express";
import { SignUpRequestBody } from "../types/requests";
import { logAndSend, logAndSendError, ResponseCode } from "../util";

const userModel = db.users;

/**
 * Middleware checking if user already exists in database. If it does, function returns an error response.
 */
export const saveUser = async (req: Request<any, string, SignUpRequestBody>, res: Response<string>, next: NextFunction) => {
    try {
        const emailCheck = await userModel.findOne({ where: { email: req.body.email } });
        if (emailCheck)
            return logAndSend(res, ResponseCode.UserExists, "This email is already registered");

        const regexTeacher = RegExp('^[\\w\\-.]+@(agh\\.edu\\.pl)');
        if (regexTeacher.test(req.body.email)) {
            req.body.isTeacher = true;
            return next();
        }

        const regexStudent = RegExp('^[\\w\\-.]+@(student\\.agh\\.edu\\.pl)');
        if (regexStudent.test(req.body.email)) {
            req.body.isTeacher = false;
            return next();
        }

        return logAndSend(res, ResponseCode.InvalidDataFormat, "E-mail doesn't pass the AGH regex verification");
    } catch (err) {
        return logAndSendError(res, ResponseCode.DatabaseError, "Database connection error", err);
    }
};