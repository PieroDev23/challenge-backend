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
export const BAD_CREDENTALS_MESSAGE = 'Bad credentials';

export const HTTP_MESSAGES = {
    200: 'everything ok!',
    201: 'resource created succesfully!',
    400: 'there was an error from the client!',
    401: 'you are not allowed to do this!',
    500: 'server its down!'
};

/**
 * 
 *  :::::::::::::::::::: APP CONSTANTS :::::::::::::::::::: 
 * 
 */

export const API_VERSION = 'v1';
export const AUTH_PATH = 'auth';
