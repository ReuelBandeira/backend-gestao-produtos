export default interface IUpdateCartMovimentDto {
  qrcode: string
  component: string
  component_quantity: number
  component_sequential: string
  position: number
  removal_date: Date
  status: number
  id_cart: number
  id_shelf: number
  id_employee_removal: number
  list_code: string
}
