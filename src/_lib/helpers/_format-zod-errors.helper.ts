import { ZodError } from "zod";


export const formatZodErrors = (errors: ZodError) => {
    return errors.issues.map(issue => ({
        field: issue.path[0],
        message: issue.message
    }))
}