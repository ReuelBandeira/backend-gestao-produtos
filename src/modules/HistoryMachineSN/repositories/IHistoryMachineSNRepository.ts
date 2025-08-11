import HistoryMachineSN from "../infra/typeorm/entities/HistoryMachineSN";


export default interface IHistoryMachineSNRepository {
  findBySerialNumber(serial_number: string): Promise<HistoryMachineSN[]>;

}
