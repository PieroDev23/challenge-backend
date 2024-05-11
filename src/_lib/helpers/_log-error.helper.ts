


type LogInfo = {
    scopeName: string;
    message: string;
    nameError: string;
    error: Error
}

/**
 * this function just print some console.logs for the errors
 * @param info info of the current error
 */
export const logError = (info: LogInfo) => {
    console.log(`[ERROR ON ${info.scopeName} (${info.nameError})]: ${info.message}`);
    console.log(info.error);
}