import { ZodSchema } from "zod";
import { formatZodErrors } from "./_format-zod-errors.helper";
import { HTTP_CODE_CLIENT_ERROR, HTTP_MESSAGES } from "../../constants";



export const parseZodSchema = (schema: ZodSchema, data: any) => {

    const { success, error } = schema.safeParse(data);

    if (!success) {
        return {
            ok: false,
            message: HTTP_MESSAGES[HTTP_CODE_CLIENT_ERROR],
            data: null,
            errors: formatZodErrors(error)
        }
    }

    return null
}