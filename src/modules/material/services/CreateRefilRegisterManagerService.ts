/* eslint-disable radix */
import IBomRepository from '@modules/bom/repositories/ICreateBomRepository';
import { ICriticalComponentRepository } from '@modules/critical_components/repositories/ICriticalComponentRepository';
import IManagementMslRepository from '@modules/management_msl/repositories/IManagementMslRepository';
import IMslMovementRepository from '@modules/msl_movements/repositories/IMslMovementRepository';
import AppError from '@shared/errors/AppError';
import { differenceInMinutes } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import MaterialManagerRefil from '../infra/typeorm/entities/MaterialManagerRefil';
import IMaterialManagerLogRefilRepository from '../repositories/IMaterialManagerLogRefilRepository';
import IMaterialManagerRefilRepository from '../repositories/IMaterialManagerRefilRepository';
import IMaterialManagerRepository from '../repositories/IMaterialManagerRepository';


interface IRequest {
  list_code: string;
  moduleMaterial: string;
  position: number;
  component_old: string;
  component_new: string;
  id_employee: number;
  sequential_old: string;
  qr_code_information_old: string;
  sequential_new: string;
  qr_code_information_new: string;
  component_quantity: number;
  feeder_pitch:number;

}

@injectable()
export default class CreateRefilRegisterManagerService {
  constructor(
    @inject('MaterialManagerRepository')
    private materialRepository: IMaterialManagerRepository,
    @inject('MaterialManagerRefilRepository')
    private materialRefilRepository: IMaterialManagerRefilRepository,
    @inject('MaterialManagerLogRefilRepository')
    private materialLogRefilRepository: IMaterialManagerLogRefilRepository,
    @inject('MslMovementRepository')
    private mslMovementRepository: IMslMovementRepository,
    @inject('ManagementMslRepository')
    private managementMslRepository: IManagementMslRepository,
    @inject('CriticalComponentRepository')
    private criticalComponentRepository: ICriticalComponentRepository,
    @inject('BomRepository')
    private bomRepository: IBomRepository,
  ) { }

  public async execute({
    list_code,
    id_employee,
    moduleMaterial,
    position,
    component_old,
    component_new,
    sequential_old,
    qr_code_information_old,
    sequential_new,
    qr_code_information_new,
    component_quantity,
    feeder_pitch
  }: IRequest): Promise<MaterialManagerRefil> {

// verifica componente old

    const module = moduleMaterial.split("-");
    const validationComponentOld = await this.materialRefilRepository.checkComponentOld(String(list_code),String(module[0]),String(module[1]),Number(module[2]),Number(position));

    if (validationComponentOld.length!==0) {
	console.log('module-->', module, list_code, position);
	console.log('validation-->', validationComponentOld[0].sequential_new);
      const verificationOld = sequential_old === validationComponentOld[0].sequential_new;
        if (verificationOld === false) {
          throw new AppError('Componente Old não é o último componente registrado nessa posição !', 402);
        }
    }


// verifica se sequencial novo ja existe

    const checkExistSequentialNew = await this.materialRefilRepository.validationEntranceRefil(String(sequential_new));

    if (checkExistSequentialNew.length !== 0) {
      throw new AppError('Componente novo não pode ser trocado, pois encontra-se registrado !', 404);
    }

// regra para componente msl expirado : inicio
    const component_msl_movement = await this.mslMovementRepository.findByCompMslMovement(String(component_new));
    const component_msl_management = await this.managementMslRepository.findByCompMslManagement(String(component_new));
    const type_movement = String(component_msl_movement?.[0]?.movement_type);
    const time_open = component_msl_movement?.[0]?.total_time_open;
    const date_start = component_msl_movement?.[0]?.start_date;
    const total_time_open = differenceInMinutes(
        new Date(),
        date_start
    );
    const total_times =(Number(total_time_open)) + time_open;


    if (component_msl_movement?.length!==0 && component_msl_management?.length!==0) {
      const timeBaking = 60 * (component_msl_management?.[0]?.management.time_baking)
      const total_time_opens =component_msl_movement?.[0]?.total_time_open;

      if (total_time_opens > timeBaking) {
        throw new AppError('Componente com tempo msl expirado', 404);
      }

    };

    if (type_movement !=="PRODUÇÃO" && component_msl_movement?.length!==0) {

      await this.mslMovementRepository.create({
        component:component_new,
        serial:sequential_new,
        start_date:new Date(),
        movement_type:"PRODUÇÃO",
        total_time_open:total_times,
        id_machine:1,
        id_employee
      });
    };

    if (component_msl_movement?.length===0) {
      await this.mslMovementRepository.create({
        component:component_new,
        serial:sequential_new,
        start_date:new Date(),
        movement_type:"PRODUÇÃO",
        total_time_open:0,
        id_machine:1,
        id_employee
      });
    };



// regra para componente msl expirado : fim

    const materialList = await this.materialRepository.findDetailsByListCode(
      list_code,
    );

    if (!materialList || materialList.length === 0) {
      throw new AppError('Esta lista não existe', 404);
    }

    const { status } = materialList[0];

    if (status === 'available' || status === 'loading' || status === 'ready') {
      throw new AppError('Lista não está ONLINE');
    }

    const [machineCode, moduleM, side] = moduleMaterial.split('-');

    const sideParsed = parseInt(side);

    const existsModule = materialList.filter(
      (material) =>
        material.machine === machineCode &&
        material.module === moduleM &&
        material.side === sideParsed &&
        material.position === position
    );

    if (!existsModule) {

      throw new AppError('Este módulo não existe na lista', 404);
    }

    const componentFromList = existsModule.find(
      (material) =>
        material.position === position &&
        material.module === moduleM &&
        material.main_components === component_old ||
        material.alternative_components === component_old,

    );


    const componentFromListNew = existsModule.find(
      (material) =>
        material.position === position &&
        material.module === moduleM &&
        material.main_components === component_new ||
        material.alternative_components === component_new,

    );

    if (!componentFromList) {

      const t = {
        component: '',
        id_employee,
        list_code,
        machine: '',
        module: moduleMaterial,
        position,
        side: 0,
        status: 'Componente Antigo não pertence a este módulo',
        component_new,
        component_old,
        feeder_new: '',
        feeder_old: '',
        feeder_pitch


      }
      // criar If para qualidade, feeder e refil

      const logErrorRefil = await this.materialLogRefilRepository.create(
        t
      );
      throw new AppError(
        'Componente Antigo não pertence a este módulo',
        402,
      );
    } else if (!componentFromListNew) {

      const t = {
        component: '',
        id_employee,
        list_code,
        machine: '',
        module: moduleMaterial,
        position,
        side: 0,
        status: 'Componente Novo não foi encontrado na lista',
        component_new,
        component_old,
        feeder_new: '',
        feeder_old: '',
        feeder_pitch


      }
      // criar If para qualidade, feeder e refil

      const logErrorRefil = await this.materialLogRefilRepository.create(
        t
      );

      throw new AppError(
        'Componente Novo não foi encontrado na lista',
        404,
      );
    }
    if (componentFromList.status_component === 'offline') {
      throw new AppError('Este Componente Antigo foi desabilitado na lista');
    } else if (componentFromListNew.status_component === 'offline') {
      throw new AppError('Este Componente Novo foi desabilitado na lista');
    }

    if (componentFromList.position !== position) {
      const t = {
        component: '',
        id_employee,
        list_code,
        machine: '',
        module: moduleMaterial,
        position,
        side: 0,
        status: 'Este Componente Antigo não pertence a esta posição',
        component_new,
        component_old,
        feeder_new: '',
        feeder_old: '',
        feeder_pitch


      }
      // criar If para qualidade, feeder e refil

      const logErrorRefil = await this.materialLogRefilRepository.create(
        t
      );
      throw new AppError('Este Componente Antigo não pertence a esta posição');
    } else if (componentFromListNew.position !== position) {
      const t = {
        component: '',
        id_employee,
        list_code,
        machine: '',
        module: moduleMaterial,
        position,
        side: 0,
        status: 'Este Componente Novo não pertence a esta posição',
        component_new,
        component_old,
        feeder_new: '',
        feeder_old: '',
        feeder_pitch

      }
      // criar If para qualidade, feeder e refil

      const logErrorRefil = await this.materialLogRefilRepository.create(
        t
      );

      throw new AppError('Este Componente Novo não pertence a esta posição');
    }

    if (componentFromList.machine !== machineCode) {
      throw new AppError('Este Componente Antigo não pertence a esta máquina');
    } else if (componentFromListNew.machine !== machineCode) {
      throw new AppError('Este Componente Novo não pertence a esta máquina');
    }

    if (componentFromList.module !== moduleM) {
      throw new AppError('Este Componente Antigo não pertence a este módulo',402);
    } else if (componentFromListNew.module !== moduleM) {
      throw new AppError('Este Componente Novo não pertence a este módulo');
    }

    if (componentFromList.side !== sideParsed) {
      throw new AppError('Este Componente Antigo não pertence a este lado');
    } else if (componentFromListNew.side !== sideParsed) {
      throw new AppError('Este Componente Novo não pertence a este lado');
    }

    const managerRefil = await this.materialRefilRepository.create({
      list_code,
      machine: machineCode,
      module: moduleM,
      side: sideParsed,
      position,
      component_old,
      component_new,
      id_employee,
      sequential_old,
      qr_code_information_old,
      sequential_new,
      qr_code_information_new,
      component_quantity
    });

    const t = {
      component: '',
      id_employee,
      list_code,
      machine: '',
      module: moduleMaterial,
      position,
      side: 0,
      status: 'Finalizado!!!',
      component_new,
      component_old,
      qr_code_information_old,
      qr_code_information_new,
      component_quantity,
      feeder_pitch

    }

    // criar If para qualidade, feeder e refil

    const logErrorRefil = await this.materialLogRefilRepository.create(
      t
    );

    const componentBom = await this.bomRepository.findByMainComponentOrAlternativeComponent(component_new)

    if (!componentBom) {
      throw new AppError('Componente new não encontrado na tabela de componentes bom',404)
    }

    const criticalComponent = await this.criticalComponentRepository.findComponent(component_old)

    if (!criticalComponent) {
      throw new AppError('Componente old não encontrado na tabela de componentes críticos',402)
    }

    await this.criticalComponentRepository.update(
      {
        component_old,
        component_new,
        component_description: componentBom.description,
        component_quantity: criticalComponent.component_quantity + component_quantity
      }
    )

    return managerRefil;
  }
}
