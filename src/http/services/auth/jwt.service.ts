import jwt, { DecodeOptions, JsonWebTokenError, VerifyCallback, VerifyOptions } from 'jsonwebtoken';
import { User } from '../../../database';


export class JWTService {

    genJWT(data: User): string {
        const { APP_JWT_SECRET } = process.env;
        return jwt.sign({ ...data }, APP_JWT_SECRET!, { expiresIn: '2 days' });
    }

    verifyJWT(token: string, handler: VerifyCallback) {
        const { APP_JWT_SECRET } = process.env;
        jwt.verify(token, APP_JWT_SECRET!, handler);
    }

}