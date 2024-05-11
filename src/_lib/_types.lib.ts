import { Request, Router, Response } from "express";
import { Query, Send } from 'express-serve-static-core';

/**
 * @type
 * App Router Object
 */
export type AppRouter = {
    name: string;
    router: Router
}

export interface TypedRequest<T, U extends Query = any> extends Request {
    body: T,
    query: U
}

export interface TypedResponse<ResBody> extends Response {
    json: Send<ResBody, this>;
}

export type InstanceableClass<T> = new (...args: any[]) => T;