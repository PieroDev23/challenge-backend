import { USER_ROLES, User } from "../../../database";
import { UserRepository } from "../../../database/repositories";


export type UserFromatted = {
    userId: string;
    firstname: string;
    lastname: string;
    role: USER_ROLES;
    email: string;
}

export class UserService {
    async findUserById(id: string) {
        const userRepo = new UserRepository();
        const user = await userRepo.findOneBy({ userId: id });
        return user;
    }

    async findUsersById(ids: string[]) {
        const userRepo = new UserRepository();
        const user = await userRepo.findIn({ prop: 'userId', values: ids })
        return user
    }

    formatUsers(users: User[]) {
        return users.map(({ userId, firstname, lastname, role, email }) => ({
            userId,
            firstname,
            lastname,
            role,
            email
        }));
    }

}