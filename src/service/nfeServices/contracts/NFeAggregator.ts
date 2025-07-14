import { CompleteNFeDTO } from "../../../dto/CompleteNFeDTO";
import { GeneralInfoDTO } from "../../../dto/GeneralInfoDTO";
import { SupplierDTO } from "../../../dto/SupplierDTO";
import { ProductDTO } from "../../../dto/ProductDTO";
import { SummaryDTO } from "../../../dto/SummaryDTO";
import { TaxDTO } from "../../../dto/TaxDTO";

export interface NFeAggregator {
  aggregate(
    generalInfo: GeneralInfoDTO,
    issuer: SupplierDTO,
    products: ProductDTO[],
    summary: SummaryDTO,
    taxes: TaxDTO
  ): CompleteNFeDTO;
}
