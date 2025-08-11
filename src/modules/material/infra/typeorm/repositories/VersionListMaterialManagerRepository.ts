import IVersionListMaterialManagerRepository from '@modules/material/repositories/IVersionListaterialManagerRepository';
import { getRepository, Repository } from 'typeorm';
import { VersionListMaterialManager } from '../entities/VersionListMaterialManager';

export default class VersionListMaterialManagerRepository
  implements IVersionListMaterialManagerRepository {
  private ormRepository: Repository<VersionListMaterialManager>;

  constructor() {
    this.ormRepository = getRepository(VersionListMaterialManager);
  }

  public async findByStructCode(
    struct_code: string,
    list_code: string,
  ): Promise<[VersionListMaterialManager[], number]> {
    const versionsAndCount = await this.ormRepository.findAndCount({
      where: {
        struct_code,
        list_code,

      },
      withDeleted: true,
    });

    return versionsAndCount;
  }

  public async generateNewVersion(
    struct_code: string,
    list_code: string,
  ): Promise<VersionListMaterialManager> {
    // eslint-disable-next-line prefer-const
    let [_, version] = await this.ormRepository.findAndCount({
      where: {
        struct_code,
      },
      withDeleted: true,
    });

    const newVersion = version + 1;

    const newVersionList = await this.ormRepository.create({
      version: newVersion,
      list_code,
      struct_code,
    });

    await this.ormRepository.save(newVersionList);

    return newVersionList;
  }

  public async disableVersion(list_code: string): Promise<void> {
    await this.ormRepository.softDelete({ list_code });
  }
}
