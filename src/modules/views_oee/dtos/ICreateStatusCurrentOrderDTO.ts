// add views oee
export default interface ICreateStatusCurrentOrderDTO {
  id_line: number;
  line_name: string;
  quantidades_de_placas_produzidas:number;
  quantidades_de_placas_teorica:number;
  saldo:number;
  trend_oee:number;
  trend_oee_signal:string;
  oee_po_day:number;
  oee_po:number;
  meta_op: number;

}
