
/**
 * @class
 * Utility class form creating singletons
 * i use this mainly for services.
 */
export class Singleton<T> {
    private static _instances: Map<string, any> = new Map();

    static getInstance<T>(classConstructor: new () => T): T {
        const className = classConstructor.name;

        if (!this._instances.has(className)) {
            this._instances.set(className, new classConstructor());
        }

        return this._instances.get(className);
    }
}

