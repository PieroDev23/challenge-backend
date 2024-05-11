import cors from 'cors';
import 'dotenv/config';
import express, { Express } from 'express';
import morgan from 'morgan';
import { BaseExpressApp, DatabaseConnector } from './_lib/';
import { AppRouting } from './app-routing';
import { appDataSource } from './database';


export class ChallengeApp implements BaseExpressApp, DatabaseConnector {

    private _app: Express;

    constructor() {
        this._app = express();
        // initializing methods...
        this.middlewares();
        this.routes();
        this.dbConnection();
    }

    /**
     * @async
     * @method
     * method that allows to stablish a db conenction
     */
    async dbConnection(): Promise<void> {
        try {
            await appDataSource.initialize();
            console.log('🐸✨ Database successfully connected');
        } catch (error) {
            if (error instanceof Error) {
                console.log(`🟥 [ERROR WHILE CONNECTING TO THE DATABASE (${error.name})]`);
                console.log(error.message);
            }
        }
    }

    /**
     * @method
     * method that initialize my app scope middlwares
     */
    middlewares(): void {
        this._app.use(cors());
        this._app.use(express.json());
        this._app.use(morgan('dev'));
    }

    /**
     * @method
     * method that initlialize all the APP routes
     */
    routes(): void {
        const { routes, apiVersion } = new AppRouting();
        for (const { pathName, router } of routes) {
            this._app.use(`/api/${apiVersion}/${pathName}`, router);
        }
    }

    /**
     * @method
     * method that boot my application
     */
    run(): void {
        const { APP_PORT } = process.env;
        this._app.listen(APP_PORT, () => {
            console.log(`✅ Application running on port ${APP_PORT}`);
        })
    }

}