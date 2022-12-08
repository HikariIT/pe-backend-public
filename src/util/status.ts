/**
 * Enum to represent various response codes used in application
 */
export enum ResponseCode {
    // region Generic success codes

    /**
     * Request successful
     * (mostly used for GET requests, where response data is provided)
     */
    DefaultSuccesful,
    /**
     * Request succesful, no response content
     * (mostly used for DELETE requests)
     */
    SuccessNoContent,
    /**
     * Request successful, resource has been created
     * (mostly used for POST requests which create objects in database)
     */
    ResourceCreated,

    // endregion

    // region Generic fail codes

    /**
     * Data not found in database
     */
    DataNotFound,
    /**
     * Token invalid or outdated
     */
    Unauthorized,
    /**
     * Request body invalid
     */
    InvalidDataFormat,
    /**
     * No permissions to get a valid response
     */
    Forbidden,
    /**
     * Database error
     */
    DatabaseError,

    // endregion

    // region Specific fail codes

    /**
     * Registration fail - user already exists
     */
    UserExists,

    // endregion
}

type ResponseCodeToCode = {
    [key in ResponseCode]: number
}

const map: ResponseCodeToCode = {
    "0": 200,
    "1": 204,
    "2": 201,
    "3": 404,
    "4": 401,
    "5": 422,
    "6": 403,
    "7": 500,
    "8": 409,
};

/**
 * Function converting ResponseCode enum to a status number
 * @param responseCode response code to convert
 */
export function getStatusCode(responseCode: ResponseCode): number {
    return map[responseCode];
}