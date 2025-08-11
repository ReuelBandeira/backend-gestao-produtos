import { inject, injectable } from "tsyringe";
import IReportRepository from "../repositories/IReportRepository";
import IFilterReportDTO from "../dtos/IFilterReportDTO";


interface IRequest {
  start_date?: Date;
  end_date?: Date;

}

@injectable()
export default class createReportservice{

    constructor(

      @inject('ReportRepository')
      private ReportRepository: IReportRepository,

    ){}

      // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
      async execute (start_date: string, end_date: string, model?: string, line? : number){
        const result = await this.ReportRepository.findFilter(start_date, end_date,model,line)
        const description = await this.ReportRepository.filterDescription(start_date, end_date,model,line)
        const scrap =  await this.ReportRepository.filterScrap(start_date, end_date,model,line)

        const resultObject: { [key: string]: { defect: string; qty: number }[] } = {};
          description?.forEach(row => {
          // eslint-disable-next-line no-shadow
          const { model, defect, qty } = row;
          if (!resultObject[model]) {
            resultObject[model] = [];
          }
          resultObject[model].push({ defect, qty });
        });

        const resultObject2: { [key: string]: { serial_number: string; reason: string }[] } = {};
        scrap?.forEach(row => {
          // eslint-disable-next-line no-shadow
          const { model, serial_number, reason } = row;
          if (!resultObject2[model]) {
            resultObject2[model] = [];
          }
          resultObject2[model].push({ serial_number, reason });
        });


        const dados = result?.map(item => {
          const model_dados = item.model_name;
          const defects = resultObject[model_dados];
          const scrapData = resultObject2[model_dados];

          return {
            ...item,
            defects: defects || [],
            scrap: scrapData || []
          };
        });

        return  dados

      }
}
