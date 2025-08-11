
export default interface IReportRepository{

  findFilter(start_date: string, end_date: string,  model?: string, line? : number ): Promise<[] | undefined>
  filterDescription(start_date: string, end_date: string,  model?: string, line? : number ): Promise<[] | undefined>
  filterScrap(start_date: string, end_date: string,  model?: string, line? : number ): Promise<[] | undefined>
}
