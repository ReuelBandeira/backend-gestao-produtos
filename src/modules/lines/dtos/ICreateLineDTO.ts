import Line from '../infra/typeorm/entities/Line';

export default interface ICreateLineDTO {
  line_name: string;
  description: string;
}

export interface LinePagination {
  line: Line[];
  totalLines: number;
  totalPages: number;
}
