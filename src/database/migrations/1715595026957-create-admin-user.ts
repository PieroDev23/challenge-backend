import { MigrationInterface, QueryRunner } from "typeorm";
import { User } from "../entities";
import { USER_ROLES } from "../types";

export class CreateAdminUser1715595026957 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Crea un nuevo usuario administrador
        const adminUser = new User();
        adminUser.firstname = "Admin";
        adminUser.lastname = "User";
        adminUser.email = "admin@example.com";
        adminUser.password = "admin123";
        adminUser.role = USER_ROLES.ADMIN;

        await queryRunner.manager.save(adminUser);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Elimina el usuario administrador si es necesario deshacer la migración
        await queryRunner.query(`DELETE FROM users WHERE email = 'admin@example.com'`);
    }
}
