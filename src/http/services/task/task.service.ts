import { useService } from "../../../_lib";
import { Project, TASK_STATUS, Task, TaskRepository, User } from "../../../database";
import { UserService } from '../user';

export type NewTask = {
    title: string;
    project: Project;
    description: string;
    asignees: User[]
}

export class TaskService {

    async createTask({ title, description, asignees, project }: NewTask) {
        const taskRepo = new TaskRepository();
        const task = taskRepo.create({
            title,
            description,
            asignees,
            project
        });

        return await taskRepo.save(task);
    }

    async findTaskById(idTask: string) {
        const taskRepo = new TaskRepository();
        return await taskRepo.findOneBy({ idTask });
    }

    async updateStatus(task: Task, status: TASK_STATUS) {
        const taskRepo = new TaskRepository();
        task.status = status;
        return await taskRepo.save(task);
    }


    formatTask(task: Task) {

        const _us = useService(UserService);
        const { asignees } = task;

        return {
            ...task,
            asignees: _us.formatUsers(asignees)
        }
    }

}