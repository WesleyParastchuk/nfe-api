import { GeneralInfoDTO } from "./GeneralInfoDTO";
import { SupplierDTO } from "./SupplierDTO";
import { ProductDTO } from "./ProductDTO";
import { SummaryDTO } from "./SummaryDTO";
import { TaxDTO } from "./TaxDTO";

export interface CompleteNFeDTO {
  supplier: SupplierDTO;
  products: ProductDTO[];
  summary: SummaryDTO;
  tax: TaxDTO;
  generalInfo: GeneralInfoDTO;
}
