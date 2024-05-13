/**
 * 
 *  :::::::::::::::::::: HTTP CODES AND VALIDATION MESSAGES :::::::::::::::::::: 
 * 
 */
export const HTTP_CODE_OK = 200;
export const HTTP_CREATED = 201;
export const HTTP_CODE_CLIENT_ERROR = 400;
export const HTTP_CODE_UNAUTHORIZE = 401;
export const HTTP_CODE_SERVER_ERROR = 500;

export const EMAIL_ALREADY_EXISTS_MESSAGE = 'This email already exists!';
export const EMAIL_VALIDATION_MESSAGE = 'Not a valid email';
export const BAD_CREDENTALS_MESSAGE = "This user doesn't exists.";

export const HTTP_MESSAGES = {
    200: 'everything ok!',
    201: 'resource created succesfully!',
    400: 'there was an error from the client! maybe the payload its wrong.',
    401: 'you are not allowed to do this!',
    500: 'server its down!'
};

export const INVALID_ROLE_MESSAGE = 'Invalid role, must be ADMIN or CONSUMER';
export const INVALID_STATUS_MESSAGE = 'Invalid role, must be PENDING or IN PROGRESS or COMPLETED';
export const NOT_ENOUGH_MEMBERS_ON_PROJECT_MESSAGE = 'No members findend. Projects need to have at least one person in addition to the administrator.';

/**
 * 
 *  :::::::::::::::::::: APP CONSTANTS :::::::::::::::::::: 
 * 
 */
export const API_VERSION = 'v1';
export const AUTH_PATH = 'auth';
export const PROJECT_PATH = 'project';
