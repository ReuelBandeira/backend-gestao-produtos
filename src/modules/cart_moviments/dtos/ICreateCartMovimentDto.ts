export default interface ICreateCartMovimentDto {
  qrcode: string
  component: string
  component_quantity: number
  component_sequential: string
  position: number
  entrance_date: Date
  status: number
  id_cart: number
  id_shelf: number
  id_employee_entrance: number
  list_code: string
  status_cart: string
}
