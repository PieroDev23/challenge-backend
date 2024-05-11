
/**
 * this function just print some console.logs for the errors
 * @param info info of the current error
 */
export const simpleLogger = (info: unknown, scope: string) => {
    if (info instanceof Error) {
        console.log(`[ERROR ON (${scope}) ${info.name}]`);
        console.log(info.message)
        console.log(info);
    }
}