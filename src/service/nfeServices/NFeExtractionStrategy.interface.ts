import { GeneralInfoDTO } from "../../dto/GeneralInfoDTO";
import { IssuerDTO } from "../../dto/IssuerDTO";
import { ProductDTO } from "../../dto/ProductDTO";
import { SummaryDTO } from "../../dto/SummaryDTO";
import { TaxDTO } from "../../dto/TaxDTO";
import { CheerioAPI } from "../extraction/common/HttpParser";

export interface NFeExtractionStrategy {
  matches(url: String): boolean;
  extractGeneralInfo(html: CheerioAPI): GeneralInfoDTO;
  extractIssuer(html: CheerioAPI): IssuerDTO;
  extractProducts(html: CheerioAPI): ProductDTO[];
  extractSummary(html: CheerioAPI): SummaryDTO;
  extractTaxes(html: CheerioAPI): TaxDTO;
}
