export default interface ICreateScrapDTO {
  serial_number: string;
  number_plates_panel?: number;
  material_quantity: number;
  type: 'painel' | 'placa' | 'componente';
  list_code?: string;
  reason: string;
  id_employee: number;
}
