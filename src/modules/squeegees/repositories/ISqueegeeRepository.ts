import ICreateSqueegeeDTO from '../dtos/ICreateSqueegeeDTO';
import { Squeegees } from '../infra/typeorm/entities/Squeegees';

export interface ISqueegeeRepository {
    findById(id: number): Promise<Squeegees | undefined>;
    findByDescriptionSqueegeeSearch(description_squeegee: string): Promise<(Squeegees | undefined)[] | undefined>;
    findByDescriptionSqueegee(description_squeegee: string): Promise<Squeegees | undefined>;
    findByCodeSqueegee(code_squeegee: string): Promise<Squeegees[] | undefined>;
    findAllSqueegees(): Promise<Squeegees[] | Squeegees>;

    create(dataSqueegee: ICreateSqueegeeDTO): Promise<Squeegees>;
    update(dataSqueegee: Squeegees): Promise<Squeegees>;
    delete(id: number): Promise<void>;

    updateStatusSqueegees(id: number): Promise<void>;
}
