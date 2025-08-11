/* eslint-disable no-restricted-syntax */
/* eslint-disable no-inner-declarations */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import OvenTemperatureRecord from '../infra/typeorm/entities/OvenTemperatureRecord';
import IOvenTemperatureRecordRepository from '../repositories/IOvenTemperatureRecordRepository';

interface IRequest {
  list_code: string;
  id_oven: number;
  pressure_1: string;
  pressure_2: string;
  pressure_3: string;
  pressure_4: string;
  speed: string;
  user_approver_1: number;
  zone_1: string;
  zone_2: string;
  zone_3: string;
  zone_4: string;
  zone_5: string;
  zone_6: string;
  zone_7: string;
  zone_8: string;
  zone_9: string;
  zone_10: string;
  zone_11: string;
  zone_12: string;
  zone_13: string;
}

@injectable()
export default class CreateOvenTemperatureRecordService {
  constructor(
    @inject('OvenTemperatureRecordRepository')
    private OvenTemperatureRecordRepository: IOvenTemperatureRecordRepository,
  ) {}

  async execute(
    {
      list_code,
      id_oven,
      pressure_1,
      pressure_2,
      pressure_3,
      pressure_4,
      speed,
      user_approver_1,
      zone_1,
      zone_2,
      zone_3,
      zone_4,
      zone_5,
      zone_6,
      zone_7,
      zone_8,
      zone_9,
      zone_10,
      zone_11,
      zone_12,
      zone_13
    }: IRequest): Promise<OvenTemperatureRecord> {

    const checkListCodeExist = await this.OvenTemperatureRecordRepository.listCodeExist(list_code);

    if (checkListCodeExist.length===0) {
      throw new AppError(`Essa lista não foi encontrada. Por favor verificar!`, 404);
    }

    const parametersPrevious = await this.OvenTemperatureRecordRepository.parameters(String(checkListCodeExist[0].struct_code),Number(id_oven));
    const parametersOld=parametersPrevious[0];

    const ovenWaiting = ({
      list_code,
      struct_code:checkListCodeExist[0].struct_code,
      id_oven,
      pressure_1,
      pressure_2,
      pressure_3,
      pressure_4,
      speed,
      user_approver_1,
      date_approver_1:() => 'CURRENT_TIMESTAMP',
      zone_1,
      zone_2,
      zone_3,
      zone_4,
      zone_5,
      zone_6,
      zone_7,
      zone_8,
      zone_9,
      zone_10,
      zone_11,
      zone_12,
      zone_13,
      status:"waiting for approval"
    });

    const ovenApproved = ({
      list_code,
      struct_code:checkListCodeExist[0].struct_code,
      id_oven,
      pressure_1,
      pressure_2,
      pressure_3,
      pressure_4,
      speed,
      user_approver_1,
      date_approver_1:() => 'CURRENT_TIMESTAMP',
      zone_1,
      zone_2,
      zone_3,
      zone_4,
      zone_5,
      zone_6,
      zone_7,
      zone_8,
      zone_9,
      zone_10,
      zone_11,
      zone_12,
      zone_13,
      status:"approved"
    });

    // Defina as propriedades que devem ser excluídas dos objetos
    const newPropertiesToRemove = ['list_code', 'user_approver_1', 'date_approver_1','status'];
    const oldPropertiesToRemove = [
      'id', 'list_code','user_approver_1', 'user_approver_2', 'user_approver_3',
      'date_approver_1', 'date_approver_2', 'date_approver_3','observation_2',
      'observation_3','status_approver_2','status_approver_3','status',
      'created_at', 'updated_at', 'deleted_at'
    ];

    // Função para criar um novo objeto excluindo as propriedades especificadas
    function createNewObject(sourceObject, propertiesToRemove) {
      const newObj = { ...sourceObject };
      propertiesToRemove.forEach(property => delete newObj[property]);
      return newObj;
    }

    // Crie os novos objetos com base nos objetos originais e as propriedades removidas
    const newObject = createNewObject(ovenWaiting, newPropertiesToRemove);

    const oldObject = createNewObject(parametersOld, oldPropertiesToRemove);

    // Loop para remover itens com valor undefined
    for (const key in newObject) {
      if (newObject.hasOwnProperty(key) && newObject[key] === undefined) {
        delete newObject[key];
      }
    }
    // Loop para remover itens com valor undefined
    for (const key in oldObject) {
      if (oldObject.hasOwnProperty(key) && oldObject[key] === undefined) {
        delete oldObject[key];
      }
    }

    let validation_register = "igual";

    // Função para comparar dois objetos
    function areObjectsEqual(obj1, obj2) {
      for (const key in obj1) {
        if (obj1[key] !== obj2[key]) {
          return false;
        }
      }
      return true;
    }

    // Comparar os dois objetos
    if (!areObjectsEqual(newObject, oldObject)) {
      validation_register = "diferente";
    }

    if(validation_register==="igual"){
      await this.OvenTemperatureRecordRepository.create(ovenApproved)
      return ({ovenRecord:ovenApproved})
    }

    if(validation_register==="diferente"){
      await this.OvenTemperatureRecordRepository.create(ovenWaiting)
      return ({ovenRecord:ovenWaiting})
    }

  }
}
