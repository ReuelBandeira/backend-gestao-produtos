import { VersionListMaterialManager } from '../infra/typeorm/entities/VersionListMaterialManager';

export default interface IVersionListMaterialManagerRepository {
  findByStructCode(
    struct_code: string,
    list_code: string,
  ): Promise<[VersionListMaterialManager[], number]>;
  generateNewVersion(
    struct_code: string,
    list_code: string,
  ): Promise<VersionListMaterialManager>;
  disableVersion(list_code: string): Promise<void>;
}
