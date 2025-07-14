import { AddressDTO } from "./AddressDTO";

export interface SupplierDTO {
  name: string;
  cnpj: string;
  address: AddressDTO;
}
