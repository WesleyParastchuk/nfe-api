import { GeneralInfoDTO } from "./GeneralInfoDTO";
import { IssuerDTO } from "./IssuerDTO";
import { ProductDTO } from "./ProductDTO";
import { SummaryDTO } from "./SummaryDTO";
import { TaxDTO } from "./TaxDTO";

export interface CompleteNFeDTO {
  issuer: IssuerDTO;
  products: ProductDTO[];
  summary: SummaryDTO;
  tax: TaxDTO;
  generalInfo: GeneralInfoDTO;
}
