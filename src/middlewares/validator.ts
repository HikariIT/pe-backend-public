import Ajv, {ValidateFunction} from 'ajv/dist/jtd'
import { NextFunction, Request, Response } from "express";
import { logAndSendError, ResponseCode } from "../util";
import { signInValidator, signUpValidator } from "../validators";

const ajv = new Ajv();

/**
 * Middleware used to validate external data before passing it to next functions
 */
export const validator = (req: Request, res: Response, next: NextFunction) => {
    let validator: ValidateFunction | null;

    //TODO: Create validator for Opinions and Classes

    if (req.method == "OPTIONS")
        return next();

    switch (req.url) {
        case '/api/users/signup':
            validator = signUpValidator(ajv);
            break;
        case '/api/users/signin':
            validator = signInValidator(ajv);
            break;
        default:
            validator = null;
            break;
    }

    if (!validator)
        return next();

    if (validator(req.body)) {
        next();
    } else {
        if (!validator.errors)
            return logAndSendError(res, ResponseCode.InvalidDataFormat, "Invalid data", "Unknown error");
        let fullErrorMessage = "";
        for (const error of validator.errors) {
            fullErrorMessage += error.message + '\n';
        }
        return logAndSendError(res, ResponseCode.InvalidDataFormat, "Invalid data", fullErrorMessage);
    }
}