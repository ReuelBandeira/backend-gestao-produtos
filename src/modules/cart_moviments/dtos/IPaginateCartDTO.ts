import CartMoviment from "../infra/typeorm/entities/CartMoviment";

export default interface IPaginateCartDTO{
  cart: CartMoviment[];
  totalPages: number;
  totalCartMoviment: number;
}
