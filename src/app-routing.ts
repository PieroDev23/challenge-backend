import { API_VERSION } from "./constants";
import { RoutesProvider } from "./_lib";
import { AuthRouter } from "./http";



export class AppRouting extends RoutesProvider {
    public apiVersion: string = API_VERSION;

    constructor() {
        super();

        this.routers = [
            AuthRouter
        ]
    }
}