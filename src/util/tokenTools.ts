import { Token } from "../types/models";
import { ResponseCode } from "./status";
import db from "../database";

const tokenModel = db.tokens;

/**
 * Function destroying given token in the database
 * @param token JWT token
 * @returns object containing valid response code (and error)
 */
export async function tokenStore(token: string): Promise<{ code: ResponseCode, err?: string }> {
    try {
        await tokenModel.create({
            token: token
        });
        return { code: ResponseCode.ResourceCreated };
    } catch (err) {
        return { code: ResponseCode.DatabaseError, err: err.toString() };
    }
}

/**
 * Function destroying given token in the database
 * @param token JWT token
 * @returns object containing valid response code (and error)
 */
export async function tokenDestroy(token: string): Promise<{ code: ResponseCode, err?: string }> {
    try {
        const dbToken: Token | null = await tokenModel.findOne({ where: { token: token } });
        if (!dbToken)
            return { code: ResponseCode.DataNotFound };
        await dbToken.destroy();
        return { code: ResponseCode.SuccessNoContent };
    } catch (err) {
        return { code: ResponseCode.DatabaseError, err: err.toString() };
    }
}