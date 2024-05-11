import { FindOptionsWhere, ObjectLiteral, Repository } from "typeorm";


/**
 * @abstract
 * @class
 * Generic class for my repositories
 */
export abstract class BaseRepository<T extends ObjectLiteral> {

    
    /**
     * find one entity by conditions
     * @param args {FindOptionsWhere} conditions
     */
    abstract findOneBy(args: FindOptionsWhere<T>): Promise<T | null>;
    /**
     * Create an entity
     * @param args {Partial<T>} entity
     */
    abstract create(args: Partial<T>): T;
    /**
     * Save an entity
     * @param args {T} entity
     */
    abstract save(args: T): Promise<T | null>
}