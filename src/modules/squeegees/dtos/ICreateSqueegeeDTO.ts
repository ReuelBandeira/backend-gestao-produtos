export default interface ICreateSqueegeeDTO {
  code_squeegee: string;
  description_squeegee: string;
  status?: string;
  usage_limit: number;
  amount_used?: number;
}
