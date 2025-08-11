
import IFilterReportDTO from "@modules/report-scrap-quality-productivity/dtos/IFilterReportDTO";
import { getManager, getRepository,EntityManager } from "typeorm";
import { Repository } from "typeorm/repository/Repository";
import IReportRepository from "@modules/report-scrap-quality-productivity/repositories/IReportRepository";
import Tracking from "@modules/trackings/infra/typeorm/entities/Tracking";
import Report from "../entities/Report";


const TOTAL_PER_PAGE = 11;

export default class ReportRepository implements IReportRepository{

  private ormRepository: Repository<Report>;

  private ormRepositoryTracking: Repository<Tracking>;

  constructor() {
    this.ormRepository = getRepository(Report);
    this.ormRepositoryTracking = getRepository(Tracking)
  }


  async findFilter(start_date: string,end_date:string, model?:string, line?: number): Promise <[] | undefined> {

        const query = `
        SELECT
          t.id_line,
          l.line_name,
          t.model_name,
          COUNT(distinct t.id) as production_qty,
          (SELECT count(*)
          from repairs r2
          join trackings t3
          	on r2.id_tracking = t3.id
      	  where t3.model_name = t.model_name
      		and (DATE(r2.created_at) BETWEEN ? AND ?)) as defects_qty,
          COALESCE(
            (SELECT SUM(pw.quantity_component)
              FROM plate_washing pw
              WHERE pw.struct_code = t.model_name
                AND DATE(pw.created_at) BETWEEN ? AND ?),
            0
          ) as plate_ws_qty,
          COALESCE(
            (SELECT SUM(s.material_quantity)
              FROM scraps s
              JOIN trackings t2
                ON s.serial_number = t2.serial_number
              WHERE t2.model_name = t.model_name
                AND DATE(s.created_at) BETWEEN ? AND ?),
            0
          ) as scrap_qty
        FROM trackings t
        JOIN \`lines\` l
          ON t.id_line = l.id
        LEFT JOIN repairs r
          ON t.id = r.id_tracking AND DATE(r.created_at) BETWEEN ? AND ?
        LEFT JOIN defect d ON r.id_defect = d.id
        WHERE t.id_next_workgroup IS NULL
          AND (DATE(t.out_line_time) BETWEEN ? AND ?)
          AND (t.model_name = ? OR ? IS NULL)
          AND (t.id_line = ? OR ? IS NULL)
        GROUP BY t.id_line, t.model_name
      `;

      const entityManager = getManager();
      const queryResult = await entityManager.query(query, [
        start_date,
        end_date,
        start_date,
        end_date,
        start_date,
        end_date,
        start_date,
        end_date,
        start_date,
        end_date,
        model || null,
        model || null,
        line || null,
        line || null,

      ]);

    return queryResult;

  }

  async filterDescription(start_date: string,end_date:string, model?:string, line?: number): Promise <[] | undefined>{

      const query = `
      SELECT
        d.description as defect,
        t.model_name as model,
        COUNT(d.description) as qty
      FROM repairs r
      JOIN defect d
        ON r.id_defect = d.id
      JOIN trackings t
        ON r.id_tracking = t.id
      WHERE (DATE(r.created_at) BETWEEN ? AND ?)
        AND (t.model_name = ? OR ? IS NULL)
        AND (t.id_line = ? OR ? IS NULL)
      GROUP BY d.description, t.model_name
    `;



    const entityManager = getManager();
    const queryResult = await entityManager.query(query, [
      start_date,
      end_date,
      model || null,
      model || null,
      line || null,
      line || null,

    ]);

    return queryResult;




  }

  async filterScrap (start_date: string,end_date:string, model?:string, line?: number): Promise <[] | undefined>{

      const query = `
      select
      s.serial_number,
      t.model_name as model,
      s.reason
      from scraps s
      join trackings t on s.serial_number = t.serial_number
      where
        (DATE(s.created_at) BETWEEN ? AND ?)
          AND (t.model_name = ? OR ? IS NULL)
          AND (t.id_line = ? OR ? IS NULL)
      `;



      const entityManager = getManager();
      const queryResult = await entityManager.query(query, [
      start_date,
      end_date,
      model || null,
      model || null,
      line || null,
      line || null,

      ]);

      return queryResult;


  }
}
