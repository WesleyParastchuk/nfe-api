import { AddressDTO } from "./AddressDTO";

export interface IssuerDTO {
  name: string;
  cnpj: string;
  address: AddressDTO;
}
