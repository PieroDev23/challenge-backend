import bcrypt from 'bcryptjs';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { USER_ROLES } from "../types";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
    userId: string;

    @Column({ type: 'varchar', name: 'first_name' })
    firstname: string;

    @Column({ type: 'varchar', name: 'last_name' })
    lastname: string;

    @Column('varchar')
    email: string;

    @Column('varchar')
    password: string;

    @Column({ type: 'enum', default: USER_ROLES.CONSUMER, enum: USER_ROLES })
    role: USER_ROLES

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP', name: 'updated_at' })
    updatedAt: Date;

    @BeforeInsert()
    hashPassword(): void {
        const salt = bcrypt.genSaltSync(12);
        this.password = bcrypt.hashSync(this.password, salt);
    }
}

