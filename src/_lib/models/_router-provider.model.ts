import { InstanceableClass } from "../_types.lib";
import { BaseRouter } from "./_base-router.model";



export abstract class RoutesProvider {

    abstract apiVersion: string;
    private _routers: InstanceableClass<BaseRouter>[] = [];

    /**
    * @getter
    * build my current routes 
    */
    get routes() {
        return this._routers.map(RouterClass => {
            const { path, _router } = new RouterClass();
            return {
                pathName: path,
                router: _router
            }
        })
    }

    
    protected set routers(routers: InstanceableClass<BaseRouter>[]) {
        this._routers = routers;
    }
}