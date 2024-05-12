import { z } from 'zod';
import { EMAIL_VALIDATION_MESSAGE, INVALID_ROLE_MESSAGE, INVALID_STATUS_MESSAGE } from '../constants';
import { TASK_STATUS, USER_ROLES } from '../database';


/**
 * ::::::::::::::::::: AUTH SCHEMAS ::::::::::::::::::: 
*/

export const UserRoleSchema = z.nativeEnum(USER_ROLES, {
    errorMap: (issue, _ctx) => {
        // mapping the errors
        const messageObj = { message: INVALID_ROLE_MESSAGE };

        const codes: { [k: string]: { message: string; } } = {
            'invalid_type': { ...messageObj },
            'invalid_enum_value': { ...messageObj },
            'default': { ...messageObj }
        }

        return codes[issue.code] || {}
    }
})


export const StatusSchema = z.nativeEnum(TASK_STATUS, {
    errorMap: (issue, _ctx) => {
        // mapping the errors
        const messageObj = { message: INVALID_STATUS_MESSAGE };

        const codes: { [k: string]: { message: string; } } = {
            'invalid_type': { ...messageObj },
            'invalid_enum_value': { ...messageObj },
            'default': { ...messageObj }
        }

        return codes[issue.code] || {}
    }
})


/**
 * @const
 * this is the Register Request Schemma
 */
export const RegisterRequestSchema = z.object({
    email: z.string().email(EMAIL_VALIDATION_MESSAGE),
    password: z.string().min(1),
    lastname: z.string().min(3),
    firstname: z.string().min(3),
    role: UserRoleSchema
});

export const LoginRequestSchema = z.object({
    email: z.string().email(EMAIL_VALIDATION_MESSAGE),
    password: z.string().min(1)
});

/**
 * ::::::::::::::::::: PROJECT SCHEMAS ::::::::::::::::::: 
*/

const UserSchema = z.object({
    firstname: z.string(),
    lastname: z.string(),
    email: z.string().email(),
    password: z.string(),
    role: z.string(),
    userId: z.string(),
    createdAt: z.string(), // Considera usar z.date() si deseas validar que sea una fecha válida
    updatedAt: z.string(), // Considera usar z.date() si deseas validar que sea una fecha válida
    iat: z.number(), // Timestamp numérico
    exp: z.number(), // Timestamp numérico
});


export const CreateProjectRequestSchema = z.object({
    consumersIds: z.array(z.string().uuid()).nonempty(),
    titleProject: z.string().min(1),
});

/**
 * ::::::::::::::::::: TASK SCHEMAS ::::::::::::::::::: 
*/
export const CreateTaskRequestSchema = z.object({
    projectId: z.string().uuid(),
    title: z.string().min(3),
    description: z.string().max(100),
    asignees: z.array(z.string().uuid()).nonempty()
});

export const UpdateTaskRequestSchema = z.object({
    status: StatusSchema,
    idProject: z.string().uuid()
});