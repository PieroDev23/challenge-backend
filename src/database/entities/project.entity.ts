import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./task.entity";
import { User } from "./user.entity";


@Entity({ name: 'projects' })
export class Project {
    @PrimaryGeneratedColumn('uuid')
    idProject: string;

    @Column('varchar')
    title: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP', name: 'updated_at' })
    updatedAt: Date;

    @OneToMany((type) => Task, (task) => task.project)
    tasks: Task[];

    @ManyToMany((type) => User, { eager: true })
    @JoinTable({
        name: 'users_projects',
        joinColumn: { name: 'project_id' },
        inverseJoinColumn: { name: 'user_id' }
    })
    users: User[];
}