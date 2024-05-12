import { API_VERSION } from "./constants";
import { RoutesProvider } from "./_lib";
import { AuthRouter, ProjectRouter } from "./http";



export class AppRouting extends RoutesProvider {
    public apiVersion: string = API_VERSION;

    constructor() {
        super();

        this.routers = [
            AuthRouter,
            ProjectRouter
        ]
    }
}