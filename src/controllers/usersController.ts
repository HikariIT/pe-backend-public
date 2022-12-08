import bcrypt from 'bcrypt'
import db from '../database'
import jwt from 'jsonwebtoken'
import { IUserInput, IUserOutput } from "../types/models";
import { SignInRequestBody, SignUpRequestBody } from "../types/requests";
import { Request, Response } from "express";
import { logAndSend, logAndSendError, logObject, ResponseCode, tokenDestroy, tokenStore } from "../util";
import { UserResponse } from "../types/responses";
import { UserParams } from "../types/params";
import { getSecondaryId } from "../util/idTools";

const userModel = db.users;
const teacherModel = db.teachers;
const studentModel = db.students;

export const signUp = async (req: Request<any, string, SignUpRequestBody>, res: Response<string>) => {
    try {
        // After successful verification by saveUser middleware, save user to database.
        // @ts-ignore -> TypeScript doesn't see that it gets fixed in the previous middleware
        const data: IUserInput = req.body;
        data.password = await bcrypt.hash(req.body.password, 10);
        const user: IUserOutput = await userModel.create(data);

        // Secondary table store
        if (data.isTeacher)
            await teacherModel.create({ user_id: user.user_id });
        else
            await studentModel.create({ user_id: user.user_id });

        logObject(user, "Added new user to database");

        return logAndSend(res, ResponseCode.ResourceCreated, user);
    } catch (err) {
        return logAndSendError(res, ResponseCode.DatabaseError, "Database error", err);
    }
}

export const signIn = async (req: Request<any, UserResponse | string, SignInRequestBody>, res: Response<UserResponse | string>) => {
    try {
        // Check if user exists in database
        const user: IUserOutput | null = await userModel.findOne({ where: { email: req.body.email } });
        if (!user)
            return logAndSend(res, ResponseCode.DataNotFound, "User not registered");

        // Check if password is correct
        const isValid = bcrypt.compare(user.password, req.body.password);
        if (!isValid)
            return logAndSend(res, ResponseCode.Unauthorized, "Wrong password");

        // If password is correct, generate a JWT and store it in database
        let token: string = jwt.sign({ user_id: user.user_id }, process.env.JWT_KEY, {
            expiresIn: 5 * 60
        });
        const tokenStored = await tokenStore(token);

        if (tokenStored.err)
            return logAndSend(res, ResponseCode.DatabaseError, "Failed to store the token in database");

        const userResponse: UserResponse = {
            user_id: user.user_id!,
            name: user.name,
            surname: user.surname,
            faculty: user.faculty,
            group_type: user.group_type,
            email: user.email,
            isTeacher: user.isTeacher,
            secondary_id: await getSecondaryId(user)
        }

        res.cookie("jwt", token, { maxAge: 5 * 60 * 1000, sameSite: true, secure: true });
        console.log(res.getHeader("Set-cookie"))
        console.log(res.getHeader("Set-Cookie"))
        return logAndSend(res, ResponseCode.DefaultSuccesful, userResponse);
    } catch (err) {
        return logAndSendError(res, ResponseCode.DatabaseError, "Database error", err);
    }
}

export const signOut = async (req: Request<any, string>, res: Response<string>) => {
    // Read data from header
    const strToken: string | string[] | undefined = req.headers['x-jwt-token'];
    if (typeof strToken === 'undefined' || Array.isArray(strToken))
        return logAndSend(res, ResponseCode.InvalidDataFormat, "Invalid format: 'x-jwt-token' can't be an array or undefined");

    // If data is valid, destroy token stored in the database
    const tokenDestroyed = await tokenDestroy(strToken);
    if (tokenDestroyed.err)
        return logAndSend(res, ResponseCode.DatabaseError, "Token couldn't be destroyed");
    return logAndSend(res, ResponseCode.SuccessNoContent, "Logged out succesfully");
}

export const getUser = async (req: Request<UserParams, UserResponse | string>, res: Response<UserResponse | string>) => {
    const user_id: number = parseInt(req.params.user_id);
    try {
        // Check if user exists
        const user: IUserOutput | null = await userModel.findOne({ where: { user_id: user_id } });
        if (!user)
            return logAndSend(res, ResponseCode.DataNotFound, "User doesn't exist");

        // Assign secondary ID
        const secondary_id = user.isTeacher ?
            (await teacherModel.findOne({ where: { user_id: user.user_id } }))!.teacher_id! :
            (await studentModel.findOne({ where: { user_id: user.user_id } }))!.student_id!;

        // Generate and send user response
        const userResponse: UserResponse = {
            user_id: user_id,
            name: user.name,
            surname: user.surname,
            faculty: user.faculty,
            group_type: user.group_type,
            isTeacher: user.isTeacher,
            email: user.email,
            secondary_id: secondary_id
        }

        return logAndSend(res, ResponseCode.DefaultSuccesful, userResponse);
    } catch (err) {
        return logAndSendError(res, ResponseCode.DatabaseError, "Database error", err);
    }
}