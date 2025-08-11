

import ICreateMachineRegistersDTO, {
  MachineRegistersPagination,
} from '../dtos/IMachineRegistersControlDTO';
import MachineRegisters, { StatusType } from '../infra/typeorm/entities/MachineRegisters';

export default interface IMachineRegistersRepository {
  findById(id: number): Promise<MachineRegisters | undefined>;
  findByMachineRegistersName(id: number): Promise<MachineRegisters | undefined>;
  findByIdToolgroup(id_toolgroup: number): Promise<MachineRegisters | undefined>;
  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  validationCreate(
    model:string,
    description: string,
    manufacturer: string,
    serial_number: string,
    voltage: string,
    id_line: number,
    status:StatusType,
    line_layout:number,

    )
    : Promise<MachineRegisters | undefined>;

  findByProductNameSearch(
    description_tooling_control: string,

  ): Promise<(MachineRegistersPagination | undefined)[] | undefined>;
  findAllMachines(page: number): Promise<MachineRegistersPagination | MachineRegisters[]>;
  create(data: ICreateMachineRegistersDTO): Promise<MachineRegisters>;
  update(
    id:number,
    model: string,
    description: string,
    manufacturer: string,
    serial_number: string,
    voltage: string,
    id_line: string,
    line_layout:number,
    status:StatusType
): Promise<void>;
  delete(id: number): Promise<void>;
  validationSn(serial_number: string): Promise<MachineRegisters | undefined>;
  validationLayoutLine(id_line:number,line_layout: number,status:StatusType): Promise<MachineRegisters | undefined>;
  deleteValidation(id: number): Promise<MachineRegisters | undefined>;
  deleteModuleUse(id: number): Promise<MachineRegisters | undefined>;
  findByMachine(id: number): Promise<MachineRegisters | undefined>;


}
