import { Response } from "express";
import { getStatusCode, ResponseCode } from "./status";

/**
 * Helper function to log response content and send it back to the client
 * @param res response object
 * @param status HTTP status
 * @param obj object to send to client in stringified version
 * @param title optional title of message displayed in console
 */
export function logAndSend (res: Response, status: ResponseCode, obj: any, title?: string) {
    const code = getStatusCode(status);
    let stringified: string = JSON.stringify(obj);
    if (typeof obj === 'string')
        stringified = obj;
    if (title)
        console.log(`[${title}]`);
    console.log(`Returned with status ${code}: ${stringified}`);

    return res.status(code).send(stringified);
}

/**
 * Helper function to log response content and error message and sending the response back to client
 * @param res response object
 * @param status HTTP status
 * @param obj object to send to client in stringified version
 * @param errorMessage error message
 * @param title optional title of the message displayed in console
 */
export function logAndSendError (res: Response, status: number, obj: any, errorMessage: any, title?: string) {
    const code = getStatusCode(status);
    let stringified: string = JSON.stringify(obj);
    if (typeof obj === 'string')
        stringified = obj;
    if (title)
        console.log(`[${title}]`);
    let err: string = errorMessage.toString();
    if (typeof errorMessage === 'object')
        err = JSON.stringify(errorMessage);

    console.log(`Returned with status ${code}: ${stringified}`);
    console.log(`Error message: \n${err}`);
    return res.status(code).send(stringified + "\n" + err);
}

/**
 * Helper function to log given object using JSON.stringify() method
 * @param obj object to log
 * @param title optional title displayed in console
 */
export function logObject (obj: any, title?: string) {
    const stringified = JSON.stringify(obj, null, 2);
    if (title)
        console.log(`[${title}]`);
    console.log(stringified);
}