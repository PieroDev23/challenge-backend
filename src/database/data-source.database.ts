import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';


const { DB_PORT, DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const options: DataSourceOptions = {
    type: 'mysql',
    port: Number(DB_PORT),
    host: DB_HOST,
    username: DB_USER,
    database: DB_NAME,
    password: DB_PASSWORD,
    synchronize: true,
    // migrations: ['./src/database/migrations/*{.ts,.js}'],
    entities: ['./src/database/entities/*.entity{.ts,.js}'],
}

export const appDataSource = new DataSource({ ...options });