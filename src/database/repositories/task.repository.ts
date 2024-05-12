import { Repository, FindOptionsWhere } from "typeorm";
import { BaseRepository } from "../../_lib/models/_base-repository.model";
import { Task } from "../entities";
import { appDataSource } from "../data-source.database";
import { simpleLogger } from "../../_lib";





export class TaskRepository extends BaseRepository<Task> {
    _repo: Repository<Task> = appDataSource.getRepository(Task);


    async findOneBy(args: FindOptionsWhere<Task>): Promise<Task | null> {
        try {
            return await this._repo.findOneBy({ ...args });
        } catch (error) {
            simpleLogger(error, this.findOneBy.name);
            return null;
        }
    }

    create(args: Partial<Task>): Task {
        return this._repo.create(args);
    }

    async save(args: Task): Promise<Task | null> {
        try {
            return await this._repo.save(args);
        } catch (error) {
            simpleLogger(error, this.save.name);
            return null;
        }
    }

}