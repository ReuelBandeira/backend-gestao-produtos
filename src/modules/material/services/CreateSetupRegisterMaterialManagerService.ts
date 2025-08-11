/* eslint-disable radix */
import IBomRepository from '@modules/bom/repositories/ICreateBomRepository';
import { ICriticalComponentRepository } from '@modules/critical_components/repositories/ICriticalComponentRepository';
import { IFeederRepository } from '@modules/feeder/repositories/IFeederRepository';
import ILineRepository from '@modules/lines/repositories/ILineRepository';
import IManagementMslRepository from '@modules/management_msl/repositories/IManagementMslRepository';
import IMslMovementRepository from '@modules/msl_movements/repositories/IMslMovementRepository';
import AppError from '@shared/errors/AppError';
import { differenceInMinutes } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import { MaterialManagerSetup } from '../infra/typeorm/entities/MaterialManagerSetup';
import IMaterialManagerRepository from '../repositories/IMaterialManagerRepository';
import IMaterialManagerSetupRepository from '../repositories/IMaterialManagerSetupRepository';

interface IRequest {
  list_code: string;
  line_name: string;
  moduleMaterial: string;
  position: number;
  feeder_code: string;
  component: string;
  id_employee: number;
  sequential: string;
  qr_code_information: string;
  component_quantity: number;
  feeder_pitch: number;
}

interface IResponse {
  materialSetup: MaterialManagerSetup;
  totalSetup: number;
}

@injectable()
export default class CreateSetupRegisterMaterialManagerService {
  constructor(
    @inject('MaterialManagerRepository')
    private materialRepository: IMaterialManagerRepository,
    @inject('MaterialManagerSetupRepository')
    private materialSetupRepository: IMaterialManagerSetupRepository,
    @inject('FeederRepository')
    private feederRepository: IFeederRepository,
    @inject('LineRepository')
    private lineRepository: ILineRepository,
    @inject('MslMovementRepository')
    private mslMovementRepository: IMslMovementRepository,
    @inject('ManagementMslRepository')
    private managementMslRepository: IManagementMslRepository,
    @inject('CriticalComponentRepository')
    private criticalComponentRepository: ICriticalComponentRepository,
    @inject('BomRepository')
    private bomRepository: IBomRepository,
  ) {}

  public async execute({
    list_code,
    line_name,
    moduleMaterial,
    position,
    feeder_code,
    component,
    id_employee,
    sequential,
    qr_code_information,
    component_quantity,
    feeder_pitch
  }: IRequest): Promise<IResponse> {

// regra para componente msl expirado : inicio
    const component_msl_movement = await this.mslMovementRepository.findByCompMslMovement(String(component));
    const component_msl_management = await this.managementMslRepository.findByCompMslManagement(String(component));
    const type_movement = String(component_msl_movement?.[0]?.movement_type);
    const time_open = component_msl_movement?.[0]?.total_time_open;
    const date_start = component_msl_movement?.[0]?.start_date;
    const total_time_open = differenceInMinutes(
      new Date(),
      date_start
    );
    const total_times =(Number(total_time_open)) + time_open;

    if (component_msl_movement?.length!==0 && component_msl_management?.length!==0) {

      const timeBaking = 60 * (component_msl_management[0].management.time_baking)
      const total_time_opens =component_msl_movement[0].total_time_open;

      if (total_time_opens > timeBaking) {
        throw new AppError('Componente com tempo msl expirado', 404);
      }
    };

    if (type_movement !=="PRODUÇÃO" && component_msl_movement?.length!==0) {
      await this.mslMovementRepository.create({
        component,
        serial:sequential,
        start_date:new Date(),
        movement_type:"PRODUÇÃO",
        total_time_open:total_times,
        id_machine:1,
        id_employee
      });
    };

    if (component_msl_movement?.length===0) {
      await this.mslMovementRepository.create({
        component,
        serial:sequential,
        start_date:new Date(),
        movement_type:"PRODUÇÃO",
        total_time_open:0,
        id_machine:1,
        id_employee
      });
    };

// regra para componente msl expirado : fim

    const [machineCode, moduleM, side] = moduleMaterial.split('-');
    // TODO Verificar se já foi lido consultando no SETUP
    const componentAlreadyRead =
      await this.materialSetupRepository.verifyComponentAlreadyRead(
        list_code,
        moduleM,
        parseInt(side),
        position,
        component,
      );
    if (componentAlreadyRead) {
      throw new AppError('Este componente já foi lido no SETUP');
    }
    // TODO Verificar se é principal ou alternativo na LISTA DE MATERIAL
    const componentFromList =
      await this.materialRepository.findComponentOrAlternateMaterial(
        component,
        moduleM,
        parseInt(side),
        position,
        list_code,
      );

    if (!componentFromList) {
      throw new AppError('Este Componente não foi encontrado na lista', 404);
    }
    if (componentFromList.status_component === 'offline') {
      throw new AppError('Este Componente foi desabilitado na lista');
    }
    if (componentFromList.position !== position) {
      throw new AppError('Este Componente não pertence a esta posição');
    }
    // TODO recuperar Linha

    const lineNameExists = await this.lineRepository.findByLineName(line_name);

    if (!lineNameExists) {
      throw new AppError('Esta Linha não existe', 404);
    }

    const { id: id_line } = lineNameExists;

    // TODO Recuperar ID do feeder
    const feeder = await this.feederRepository.findByFeederName(feeder_code);
    if (!feeder) {
      throw new AppError('Feeder não existe', 404);
    }
    if (feeder.status === 'using' || feeder.status === 'maintence') {
      throw new AppError('Este Feeder não pode ser usado');
    }
    const { id: id_feeder } = feeder;
    // TODO Alterar status do feeder para 'using'
    Object.assign(feeder, {
      status: 'using',
    });
    await this.feederRepository.update(feeder);
    // TODO Salvar no Banco de dados na tabela de Setup


    const materialSetup = await this.materialSetupRepository.create({
      list_code,
      id_line,
      machine: machineCode,
      module: moduleM,
      side: parseInt(side),
      position,
      id_feeder,
      component,
      id_employee,
      sequential,
      qr_code_information,
      component_quantity,
      feeder_pitch
    });
    // TODO Alterar status do Componente para lido

    const componentListVerify =
      await this.materialRepository.findComponent(
        componentFromList.main_components ,
        moduleM,
        parseInt(side),
        position,
        list_code,
      );

    for(let i = 0; i < componentListVerify.length; i++){
      await this.materialRepository.updateStatusComponent(componentListVerify[i].id);
    }

    // TODO Retornar quantidade lido no SETUP
    const totalSetup =
      await this.materialSetupRepository.getTotalSetupByListCode(
        String(list_code),
      );

    const totalComponent =
      await this.materialRepository.totalComponentSMTList(
        String(list_code),
      );
    if (totalSetup === totalComponent) {
      // ? Finalizou o Setup
      await this.materialRepository.updateStatus(
        list_code,
        'ready',
        id_employee,
      );
    }

    const componentBom = await this.bomRepository.findByMainComponentOrAlternativeComponent(component)

    await this.criticalComponentRepository.create({
      component,
      component_description: componentBom?.description as string,
      component_quantity,
      component_quantity_bom: componentBom?.qty_used as number,
      list_code,
      machine: machineCode,
      module: moduleM,
      side,
      used_quantity: 0,
      position
    })

    return { materialSetup, totalSetup };
  }
}
