import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TASK_STATUS } from "../types";
import { User } from "./user.entity";
import { Project } from "./project.entity";

@Entity({ name: 'tasks' })
export class Task {
    @PrimaryGeneratedColumn('uuid', { name: 'task_id' })
    idTask: string;

    @Column('varchar')
    title: string;

    @Column('varchar')
    description: string;

    @Column({ type: 'enum', default: TASK_STATUS.PENDING, enum: TASK_STATUS })
    status: TASK_STATUS;

    @ManyToMany((type) => User, { eager: true })
    @JoinTable({
        name: 'users_tasks',
        joinColumn: { name: 'task_id' },
        inverseJoinColumn: { name: 'user_id' }
    })
    users: User[];

    @ManyToOne((type) => Project, (project) => project.tasks, { nullable: false })
    @JoinColumn({ name: 'project_id' })
    project: Project;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP', name: 'updated_at' })
    updatedAt: Date;
}