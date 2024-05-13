import { USER_ROLES, User, UserRepository } from "../../database"






export const createAdminUser = async () => {
    const repo = new UserRepository();
    const user = await repo.findOneBy({ firstname: 'admin' })
    if (user) {
        return
    }

    const admin = new User();
    admin.email = 'admin@gmail.com';
    admin.firstname = 'admin';
    admin.lastname = 'admin';
    admin.password = 'admin';
    admin.role = USER_ROLES.ADMIN;

    await repo.save(admin);
}