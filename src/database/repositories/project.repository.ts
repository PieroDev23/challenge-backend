import { FindOneOptions, FindOptionsWhere, Repository } from "typeorm";
import { BaseRepository } from "../../_lib/models/_base-repository.model";
import { Project } from "../entities";
import { appDataSource } from "../data-source.database";
import { simpleLogger } from "../../_lib";




export class ProjectRepository extends BaseRepository<Project> {

    _repo: Repository<Project> = appDataSource.getRepository(Project);

    async findAll() {
        return await this._repo.createQueryBuilder("project")
            .innerJoinAndSelect("project.members", "users")
            .innerJoinAndSelect("project.createdBy", "manager")
            .select([
                "project.idProject",
                "project.title",
                "users.userId",
                "users.firstname",
                "users.lastname",
                "users.email",
                "users.role",
                "users.user_id",
                "manager.userId",
                "manager.firstname",
                "manager.lastname",
                "manager.email",
                "manager.role"
            ])
            .getMany();
    }

    async findOneBy(args: FindOptionsWhere<Project>): Promise<Project | null> {
        try {
            return await this._repo.findOneBy({ ...args });
        } catch (error) {
            simpleLogger(error, this.findOneBy.name);
            return null
        }
    }

    async findOne(args: FindOneOptions<Project>) {
        return await this._repo.findOne({ ...args });
    }

    create(args: Partial<Project>): Project {
        const project = this._repo.create(args);
        return project;
    }

    async save(args: Project): Promise<Project | null> {
        try {
            return await this._repo.save(args);
        } catch (error) {
            simpleLogger(error, this.findOneBy.name);
            return null;
        }
    }

}