import { Request, Response, Router } from "express";
import { RouteObject } from "../_interfaces.lib";
import { BaseController } from "./_base-controller.model";
import { Singleton } from "../helpers";


/**
 * @abstract
 * @class
 * Base model for my subclasess Routers
 */
export abstract class BaseRouter {

    public _router: Router;
    public path: string;
    private _routes: RouteObject[] = [];

    constructor() {
        this._router = Router();
    }

    /**
     * @method
     * method that allows the initialization of my routes with their handlers, services, etc.
     */
    private onInitRouter(): void {
        this._routes.forEach(route => {
            // extract the properties from my route object
            const { method, path, controller: Controller, middlewares, services } = route;

            let c: BaseController;
            // if we heve some services we inject those services
            if (services && services.length >= 1) {
                const Services = services.map(Service => Singleton.getInstance(Service));
                c = new Controller(...Services);
            } else {
                c = new Controller();
            }

            // creating a handler warrapper function for my class
            const controllerWrapper = (req: Request, res: Response) => {
                c.execute(req, res);
            }

            // creating the route
            this._router[method](`/${path}`, middlewares || [], controllerWrapper);
        });
    }

    /**
     * @protected
     * @setter
    * Setter method, set current router routes
    */
    protected set routes(routes: RouteObject[]) {
        this._routes = routes;
        this.onInitRouter();
    }

}