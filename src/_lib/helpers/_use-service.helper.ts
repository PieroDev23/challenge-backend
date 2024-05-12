import { Singleton } from "./_singleton.helper"




/**
 * Simple function to use a service
 * @param Service Service class
 * @returns service instance
 */
export const useService = <T>(Service: new () => T) => {
    return Singleton.getInstance(Service);
}