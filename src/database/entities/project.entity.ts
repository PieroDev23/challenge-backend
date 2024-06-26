import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm";
import { Task } from "./task.entity";
import { User } from "./user.entity";


@Entity({ name: 'projects' })
export class Project {
    @PrimaryGeneratedColumn('uuid', { name: 'id_project' })
    idProject: string;

    @Column('varchar')
    name: string;

    @ManyToOne((type) => User, { eager: true })
    @JoinColumn({ name: 'created_by_user' })
    createdBy: User;

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