import {NextFunction, Request, Response} from "express";
import {ITokenInput} from "../types/models";
import {logAndSend, logAndSendError, ResponseCode} from "../util";
import jwt from "jsonwebtoken"
import db from "../database";

const tokenModel = db.tokens;

/**
 * @description Function verifying if JWT token provided in headers as 'x-jwt-token' is valid.
 */
export default async (req: Request, res: Response, next: NextFunction) => {
    const strToken: string | string[] | undefined = req.headers["x-jwt-token"]!;
    if (typeof strToken === 'undefined' || Array.isArray(strToken))
        return logAndSend(res, ResponseCode.InvalidDataFormat, "Invalid format: 'x-jwt-token' can't be an array or undefined");
    const inputToken: ITokenInput = { token: strToken };
    const token = await tokenModel.findOne({ where: { token: inputToken.token } });
    if (token) {
        jwt.verify(inputToken.token, process.env.JWT_KEY, async (err) => {
            if (err) {
                await token.destroy();
                return logAndSendError(res, ResponseCode.Unauthorized, "Outdated token", err)
            }
            next();
        });
    }
    else {
        return logAndSend(res, ResponseCode.Unauthorized, "Invalid token")
    }
}