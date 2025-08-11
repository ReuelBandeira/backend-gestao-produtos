import IFilterReportDTO from "@modules/report-scrap-quality-productivity/dtos/IFilterReportDTO";
import createReportservice from "@modules/report-scrap-quality-productivity/services/createReportservice";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class reportController{

  async findFilter(request: Request, response: Response): Promise<Response>{
    const {start_date, end_date, model, line } =
    request.query as unknown as IFilterReportDTO;

    const filterdata = container.resolve(createReportservice);
    const result = await filterdata.execute(start_date, end_date, model, line);

    const jsonResult = {
      items: result
    }
    return response.status(201).json(jsonResult);



  }

}
