import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Task } from "./task.entity";
import { User } from "./user.entity";


@Entity({ name: 'projects' })
export class Project {
    @PrimaryGeneratedColumn('uuid', { name: 'id_project' })
    idProject: string;

    @Column('varchar')
    title: string;

    @OneToOne((type) => User, { eager: true, cascade: true })
    @JoinColumn({ name: 'created_by_user' })
    createdBy: string;

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
    members: User[];
}