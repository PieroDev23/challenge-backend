import { useService } from "../../../_lib";
import { Project, USER_ROLES, User } from "../../../database";
import { ProjectRepository } from "../../../database/repositories/project.repository";
import { TaskService } from "../task";


export type NewProject = {
    members: User[];
    name: string;
    createdBy: User;
}

export type ProjectFormatted = {
    name: string;
    idProject: string;
    createdBy: Partial<User>;
    members: {
        firstname: string;
        lastname: string;
        email: string;
        role: USER_ROLES;
    }[];
}


export class ProjectService {

    async findProjectById(idProject: string) {
        const projectRepo = new ProjectRepository();
        return await projectRepo.findOneBy({ idProject })
    }

    async getAllProjects() {
        const projectRepo = new ProjectRepository();
        return await projectRepo.findAll();
    }

    getProjectsById(user: User, projects: Project[]) {

        if (user.role !== USER_ROLES.ADMIN) {
            return projects.filter((project) => {
                return !!project.members.find(m => m.userId === user.userId);
            });
        }

        return projects;
    }

    async createProject({ name, members, createdBy }: NewProject) {
        const projectRepo = new ProjectRepository();

        const project = projectRepo.create({
            name,
            members,
            createdBy
        });

        return await projectRepo.save(project);
    }

    formatProject(project: Project): ProjectFormatted {
        const { name, members, idProject, createdBy, tasks } = project;
        const { password, createdAt, updatedAt, ...rest } = createdBy;
        return {
            name,
            idProject,
            createdBy: rest,
            members: members.map(({ firstname, lastname, email, role, userId }) => ({
                id: userId,
                firstname,
                lastname,
                email,
                role
            }))
        }
    }

    findAdminOnProject(projectFormatted: ProjectFormatted) {
        return projectFormatted.members.find(user => user.role === USER_ROLES.ADMIN);
    }

    async getProjectTasks(idProject: string) {
        const projectRepo = new ProjectRepository();
        const _ts = useService(TaskService);
        const project = await projectRepo.findOne({
            where: { idProject },
            relations: ['tasks']
        });

        const tasks = project?.tasks.map(_ts.formatTask);
        return tasks ?? [];
    }


}