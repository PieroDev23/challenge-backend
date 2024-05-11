import jwt from 'jsonwebtoken';


export class JWTService {

    genJWT(data: any): string {
        const { APP_JWT_SECRET } = process.env;
        return jwt.sign({ ...data }, APP_JWT_SECRET!, { expiresIn: '1h' });
    }

}