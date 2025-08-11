import { TrackingRoot } from '@modules/trackings/dtos/ICreateTrackingDTO';
import ITrackingRepository from '@modules/trackings/repositories/ITrackingRepository';
import { getRepository, Repository } from 'typeorm';
import Tracking from '../entities/Tracking';

export default class TrackingRepository implements ITrackingRepository {
  private ormrepository: Repository<Tracking>;

  constructor() {
    this.ormrepository = getRepository(Tracking);
  }

  public async update(data: Tracking): Promise<Tracking> {
    return await this.ormrepository.save(data);
  }

  async findById(id: number): Promise<Tracking | undefined> {
    return await this.ormrepository.findOne(id);
  }

  public async findTrackinsByOP(mo_number: string): Promise<Tracking[]> {
    return await this.ormrepository.find({
      where: {
        mo_number,
      },
      relations: [
        'workStation',
        'workStation.workgroup',
        'line',
        'employee',
        'workgroup',
      ],
      order: {
        created_at: 'DESC',
      },
    });
  }

  async checkIfExists(serial_number: string): Promise<Tracking | undefined> {
    return await this.ormrepository.findOne({
      where: [
        {
          serial_number,
        },
        {
          serial_number: `PL-${serial_number}`,
        },
      ],
      relations: [
        'workStation',
        'workStation.workgroup',
        'line',
        'employee',
        'workgroup',
      ],
    });
  }

  async findByHourByHour(id_line: number, startDate: string, endDate: string): Promise<TrackingRoot[]> {



    return await this.ormrepository.query(
      "SELECT `tracking`.`id` AS `tracking_id`, " +
      "`tracking`.`serial_number` AS `tracking_serial_number`, " +
      "`tracking`.`mo_number` AS `tracking_mo_number`, " +
      "`tracking`.`model_name` AS `tracking_model_name`, " +
      "`tracking`.`out_line_time` AS `tracking_out_line_time`, " +
      "`tracking`.`id_line` AS `tracking_id_line`, " +
      "`product`.`id` AS `product_id`, " +
      "`product`.`product_name` AS `product_product_name`, " +
      "`product`.`description` AS `product_description`, " +
      "`target`.`id` AS `target_id`, " +
      "`target`.`target` AS `target_target`, " +
      "`line`.`line_name` as `line_line_name` " +
      "FROM `trackings` `tracking` " +
      "LEFT JOIN `lines` `line` ON  `tracking`.`id_line` = `line`.`id` " +
      "AND `line`.`deleted_at` IS NULL " +
      "LEFT JOIN `production_order` `production_order` ON  `tracking`.`mo_number` = `production_order`.`mo_code` " +
      "AND `production_order`.`deleted_at` IS NULL " +
      "LEFT JOIN `products` `product` ON  `production_order`.`id_product` = `product`.`id` " +
      "AND `product`.`deleted_at` IS NULL " +
      "LEFT JOIN `targets` `target` ON  `target`.`id_product` = `product`.`id` " +
      "AND `target`.`id_line` = ? " +
      "AND `target`.`deleted_at` IS NULL " +
      "WHERE ( `tracking`.`id_line` = ? AND `tracking`.`serial_dad` IS NOT NULL AND `tracking`.`out_line_time` BETWEEN ? AND ? ) " +
      "AND ( `tracking`.`deleted_at` IS NULL ) " +
      "ORDER BY `tracking`.`out_line_time` ASC", [id_line, id_line, startDate, endDate])
  }
}
