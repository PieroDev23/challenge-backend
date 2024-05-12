import { FindManyOptions, FindOptionsWhere, In, KeysOfAType, Repository } from "typeorm";
import { BaseRepository } from "../../_lib/models/_base-repository.model";
import { appDataSource } from "../data-source.database";
import { User } from "../entities";
import { simpleLogger } from "../../_lib";

export class UserRepository extends BaseRepository<User> {
    _repo: Repository<User> = appDataSource.getRepository(User);

    constructor() {
        super();
    }

    async findIn(args: { prop: keyof Omit<User, 'hashPassword'>, values: any[] }) {
        try {
            const users = await this._repo.findBy({ [args.prop]: In(args.values) });
            return users;
        } catch (error) {
            simpleLogger(error, this.findIn.name);
            return []
        }
    }

    async findOneBy(args: FindOptionsWhere<User>): Promise<User | null> {
        try {
            const user = await this._repo.findOneBy({ ...args });
            return user;
        } catch (error) {

            simpleLogger(error, this.findOneBy.name);
            return null;
        }
    }

    create(args: Partial<User>): User {
        const user = this._repo.create(args);
        return user;
    }

    async save(args: User): Promise<User | null> {
        try {
            return await this._repo.save(args);
        } catch (error) {
            simpleLogger(error, this.findOneBy.name);
            return null;
        }

    }
}

