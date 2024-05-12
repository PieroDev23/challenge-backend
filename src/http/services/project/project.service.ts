import { Project, USER_ROLES, User } from "../../../database";
import { ProjectRepository } from "../../../database/repositories/project.repository";


export type NewProject = {
    members: User[];
    title: string;
    createdBy: string;
}

export type ProjectFormatted = {
    title: string;
    members: {
        firstname: string;
        lastname: string;
        email: string;
        role: USER_ROLES;
    }[];
}


export class ProjectService {

    async findProjectById(id: string) {
        const projectRepo = new ProjectRepository();
        return await projectRepo.findOneBy({ idProject: id })
    }


    async createProject({ title, members, createdBy }: NewProject) {
        const projectRepo = new ProjectRepository();

        const project = projectRepo.create({
            title,
            members,
            createdBy
        });

        return await projectRepo.save(project);
    }


    formatProject(project: Project): ProjectFormatted {
        const { title, members } = project;
        return {
            title,
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

}