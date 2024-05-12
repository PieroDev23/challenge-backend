import bcrypt from 'bcryptjs';
import { User } from "../../../database";
import { UserRepository } from "../../../database/repositories/user.repository";
import { RegisterRequest } from "../../controllers/auth/register.controller";


/**
 * @class
 * service class that provide some functions for manage Auth Business logic suff
 */
export class AuthService {

    /**
     * @async
     * @method
     * Verify if the user exists by email
     * @param email email from the usere
     * @returns {User | null} user entity or null
     */
    async verifyUserEmail(email: string): Promise<User | null> {
        const userRepo = new UserRepository();
        const user = await userRepo.findOneBy({ email });
        return user;
    }

    /**
     * @method
     * Compare the passwords using bcrypt behind the scene
     * @param incomingPassword password coming from the request
     * @param savedPassword password saved 
     * @returns {Boolean} boolean result
     */
    comparePasswords(incomingPassword: string, savedPassword: string): boolean {
        console.log({ incomingPassword, savedPassword });

        return bcrypt.compareSync(incomingPassword, savedPassword);
    }

    /**
     * Create a user account 
     * @param userRegisterRequest user register request 
     * @returns {User | null} user entity or null
     */
    async registerUser(userRequest: RegisterRequest): Promise<User | null> {
        const userRepo = new UserRepository();
        const user = userRepo.create(userRequest);

        return await userRepo.save(user);
    }
}