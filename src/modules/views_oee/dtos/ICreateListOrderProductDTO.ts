// add views oee
export default interface ICreateListOrderProductDTO {

  id_line: number;
  line_name: string;
  id_production_order: number;
  mo_code: string;
  mo_status: string;
  target_qty: number;
  mo_start_date: Date;
  output_qty: number;
  id_product: number;
  product_name: string;
  product_description: string;
  regected_amount: number;
  disponibilidade: number;
  oee_po: number;
  rate: number;

}
