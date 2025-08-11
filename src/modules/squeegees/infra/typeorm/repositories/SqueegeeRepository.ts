import ICreateSqueegeeDTO from "@modules/squeegees/dtos/ICreateSqueegeeDTO";
import { ISqueegeeRepository } from "@modules/squeegees/repositories/ISqueegeeRepository";
import { getRepository, Like, Repository } from "typeorm";
import { Squeegees } from "../entities/Squeegees";

const TOTAL_PER_PAGE = 11;

export class SqueegeeRepository implements ISqueegeeRepository {

    private ormRepository: Repository<Squeegees>;

    constructor() {
        this.ormRepository = getRepository(Squeegees);
    }

    public async findById(id: number): Promise<Squeegees | undefined> {
        const squeegee = await this.ormRepository.findOne({
            where: { id },
        });

        return squeegee;
    }

    public async findByDescriptionSqueegeeSearch(description_squeegee: string): Promise<(Squeegees | undefined)[] | undefined> {
        const squeegee = await this.ormRepository.find({
            where: { description_squeegee: Like(`%${description_squeegee}%`) },
        });

        return squeegee;
    }

    public async findByDescriptionSqueegee(description_squeegee: string): Promise<Squeegees | undefined> {
        const squeegee = await this.ormRepository.findOne({
            where: { description_squeegee }
        });

        return squeegee;
    }

    public async findByCodeSqueegee(code_squeegee: string): Promise<Squeegees[] | undefined> {
        const squeegee = await this.ormRepository.find({
            where: { code_squeegee }
        });

        return squeegee;
    }

    public async findAllSqueegees(page = 1): Promise<Squeegees | Squeegees[]> {
        const squeegee = await this.ormRepository.find({
            order: { id: 'DESC' },
            skip: (page - 1) * TOTAL_PER_PAGE,
            take: TOTAL_PER_PAGE,
        });

        const totalSqueegee = (await this.ormRepository.find()).length;

        return {
            squeegee,
            totalPages: totalSqueegee / TOTAL_PER_PAGE,
            totalSqueegee,

        };
    }

    public async create(dataSqueegee: ICreateSqueegeeDTO): Promise<Squeegees> {
        const squeegee = this.ormRepository.create(dataSqueegee);
        await this.ormRepository.save(squeegee);

        return squeegee;
    }

    public async update(dataSqueegee: Squeegees): Promise<Squeegees> {
        const squeegee = await this.ormRepository.save(dataSqueegee);
        return squeegee;
    }

    public async delete(id: number): Promise<void> {
        await this.ormRepository.softDelete({ id });
    }

    public async updateStatusSqueegees(
      id: number,
    ): Promise<void> {
      await this.ormRepository
      .createQueryBuilder('squeegees')
      .update(Squeegees)
      .set({status: "available"})
      .where({id})
      .execute()
    }



}
