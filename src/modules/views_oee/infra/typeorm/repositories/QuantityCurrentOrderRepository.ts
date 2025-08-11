

// eslint-disable-next-line import/no-unresolved
import IQuantityCurrentOrderRepository from "@modules/views_oee/repositories/IQuantityCurrentOrderRepository";
import { Repository, getRepository } from "typeorm";
import QuantityCurrentOrder from "../entities/QuantityCurrentOrder";

// const TOTAL_PER_PAGE = 11;

export default class QuantityCurrentOrderRepository implements IQuantityCurrentOrderRepository {
  private ormRepository: Repository<QuantityCurrentOrder>;

  constructor() {
    this.ormRepository = getRepository(QuantityCurrentOrder);

  }
  findViewsLinesQuantityCurrentOrder(id_line: number): Promise<QuantityCurrentOrder | QuantityCurrentOrder[]> {
    throw new Error("Method not implemented.");
  }

  public async findTarget(): Promise<QuantityCurrentOrder[]> {
    const result = await this.ormRepository.query(
      `${'select l.id,l.line_name,t.id_line,t.id_product,t.target from targets t join production_order po on t.id_product = po.id_product and po.mo_status = "online" join `lines` l on t.id_line = l.id where target != 0'}`
    );
    return result;
  }

  public async numberPlates(horaInicio: string, horaFim: string): Promise<QuantityCurrentOrder[]> {
    const dataAtual = new Date();
    const dataFormatada = dataAtual.toISOString().slice(0, 10);
    const dataInicio = String(dataFormatada).concat(`T${horaInicio}:00.000Z`);
    const dataFim = String(dataFormatada).concat(`T${horaFim}:59.999Z`);

    const resultado = await this.ormRepository.query(`
      SELECT
        id_line,
        COUNT(serial_number) AS quantidade_placas
      FROM
        trackings t
      WHERE
        t.out_line_time IS NOT NULL
        AND id_next_workgroup IS NULL
        AND t.out_line_time BETWEEN ? AND ?
      GROUP BY
        id_line
    `, [dataInicio, dataFim]);

    // Converter a propriedade quantidade_placas para tipo numérico
    const resultadoNumerico: QuantityCurrentOrder[] = resultado.map((item: any) => ({
      id_line: item.id_line,
      quantidade_placas: Number(item.quantidade_placas),
    }));

    return resultadoNumerico;
  }


  public async findStatus(): Promise<QuantityCurrentOrder[]> {
    const result = await this.ormRepository.query(`
          SELECT
          l.id AS id_line,
          l.line_name AS line_name,
          (
            CASE
              WHEN (
                SELECT dm2.status AS ultimo_valor
                FROM dowtime_management dm2
                WHERE dm2.id_line = dm.id_line AND dm2.id = (
                  SELECT MAX(dm3.id)
                  FROM dowtime_management dm3
                  WHERE dm3.id_line = dm2.id_line
                )
                GROUP BY dm2.id_line, dm2.status
              ) = 'FINALIZADO'
              THEN 'OPERATION'
              WHEN (
                SELECT dm2.status AS ultimo_valor
                FROM dowtime_management dm2
                WHERE dm2.id_line = dm.id_line AND dm2.id = (
                  SELECT MAX(dm3.id)
                  FROM dowtime_management dm3
                  WHERE dm3.id_line = dm2.id_line
                )
                GROUP BY dm2.id_line, dm2.status
              ) = 'ABERTO'
              THEN (
                SELECT dm2.reason AS ultimo_valor
                FROM dowtime_management dm2
                WHERE dm2.id_line = dm.id_line AND dm2.id = (
                  SELECT MAX(dm3.id)
                  FROM dowtime_management dm3
                  WHERE dm3.id_line = dm2.id_line
                  GROUP BY dm2.reason
                )
                GROUP BY dm2.id_line, dm2.reason
                ORDER BY dm2.id DESC
              )
              ELSE 'OPERATION'
            END
          ) AS status
        FROM dowtime_management dm
        JOIN \`lines\` l ON l.id = dm.id_line
        GROUP BY l.id;
    `);
    return result;
  }








}
