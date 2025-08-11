import IInactivateToolsRepository from '@modules/inactivate_tools/repositories/IInactivateToolsRepository';
import ICreateInactivateToolsDTO, { InactivateToolsPagination } from '@modules/inactivate_tools/dtos/ICreateInactivateToolsDTO';

import { getRepository, Like, Repository } from 'typeorm';

import InactivateTools from '../entities/InactivateTools';
import ToolingControl from '@modules/tooling_control/infra/typeorm/entities/ToolingControl';

const TOTAL_PER_PAGE = 11;

export default class InactivateToolsRepository implements IInactivateToolsRepository {
    private ormRepository: Repository<InactivateTools>;
    private ormToolingControlRepository: Repository<ToolingControl>;

    constructor() {
        this.ormRepository = getRepository(InactivateTools);
        this.ormToolingControlRepository = getRepository(ToolingControl);
    }

    public async create(data: ICreateInactivateToolsDTO): Promise<InactivateTools> {
        const inactivateTools = this.ormRepository.create(data);
        await this.ormRepository.save(inactivateTools);
        return inactivateTools;
    }

    public async update(
        id: number,
        id_tooling_control: number,
        reason_tool_inactivation: string
    ): Promise<void> {
        await this.ormRepository.createQueryBuilder()
            .update(InactivateTools)
            .set({ id_tooling_control, reason_tool_inactivation })
            .where({ id })
            .execute();
    }


    public async delete(id: number): Promise<void> {
        await this.ormRepository.softDelete({ id });
    }


    public async findByToolingControlName(
        id: number,
    ): Promise<InactivateTools | undefined> {
        const findInactivateTools = await this.ormRepository.findOne({
            relations: ['tooling_control'],
            where: { id },
        });
        return findInactivateTools;
    }



    public async findById(id: number): Promise<InactivateTools | undefined> {
        const findInactivateTools = await this.ormRepository.findOne({ id });

        return findInactivateTools;
    }


    public async findByInactivateToolsSearch(reason_tool_inactivation: string, page = 1): Promise<(InactivateToolsPagination | undefined)[] | undefined> {
        const inactivateTools = await this.ormRepository.find({
            relations: ['tooling_control'],
            where: { reason_tool_inactivation: Like(`%${reason_tool_inactivation}%`) },
            order: { id: 'DESC' },
            skip: (page - 1) * TOTAL_PER_PAGE,
            take: TOTAL_PER_PAGE,
        });

        const totalInactivateTools = (await this.ormRepository.find({
            where: { reason_tool_inactivation: Like(`%${reason_tool_inactivation}%`) },
        })).length;

        return {
            inactivateTools,
            totalPages: totalInactivateTools / TOTAL_PER_PAGE,
            totalInactivateTools,
        };

    }


    public async findAllInactivateTools(page = 1): Promise<InactivateToolsPagination> {
        const inactivateTools = await this.ormRepository.find({
            relations: ['tooling_control'],
            order: { id: 'DESC' },
            skip: (page - 1) * TOTAL_PER_PAGE,
            take: TOTAL_PER_PAGE,
        });

        const totalInactivateTools = (await this.ormRepository.find()).length;

        return {
            inactivateTools,
            totalPages: totalInactivateTools / TOTAL_PER_PAGE,
            totalInactivateTools,
        };
    }


    public async findByIdToolingControl(id: number): Promise<void> {
        await this.ormToolingControlRepository
            .createQueryBuilder('tooling_control')
            .update(ToolingControl)
            .set({ status: 'inactive' })
            .where({ id })
            .execute();
    }


    public async findByIdToolingControlInactive(id: number): Promise<ToolingControl | undefined> {
        const findById = await this.ormToolingControlRepository.findOne({
            where: { id, status: "inactive" }
        });
        return findById;
    }
}
