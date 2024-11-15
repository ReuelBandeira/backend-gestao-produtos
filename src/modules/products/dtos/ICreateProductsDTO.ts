export default interface ICreateProductDTO {
  name: string;
  description: string;
  price: number;
  expirationDate: string;
  image: string;
  categoryId: number;
}
