import { NextFunction } from "express";
import { Request, Response } from "express";
import { InstanceableClass } from "./_types.lib";
import { BaseController } from "./models";


/**
 * @interface
 * base app methods
 */
export interface BaseExpressApp {
    middlewares(): void;
    routes(): void;
    run(): void;
}

/**
 * @interface
 * method that allow to stablish a connection to the current DB
 */
export interface DatabaseConnector {
    dbConnection(): Promise<void>
}

/**
 * @type
 * Route Object cointains handlers, path, HTTP method, sercvices and middlewares
 */
export type RouteObject = {
    path: string;
    method: 'post' | 'put' | 'delete' | 'get' | 'patch'
    controller: InstanceableClass<BaseController>,
    services?: (new () => any)[];
    middlewares?: ((req: Request, res: Response, next: NextFunction) => void)[]
}