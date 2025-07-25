import { GeneralInfoDTO } from "./../../../dto/GeneralInfoDTO";
import { NFeExtractionStrategy } from "../../nfeServices/NFeExtractionStrategy.interface";
import { SupplierDTO } from "../../../dto/SupplierDTO";
import { ProductDTO } from "../../../dto/ProductDTO";
import { SummaryDTO } from "../../../dto/SummaryDTO";
import { TaxDTO } from "../../../dto/TaxDTO";
import { CheerioAPI } from "../common/HttpParser";
import { extractSaoPauloGeneralInfo } from "./extractors/GeneralInfoExtractor";
import { extractSaoPauloIssuer } from "./extractors/IssuerExtractor";
import { extractSaoPauloProducts } from "./extractors/ProductExtractor";
import { extractSaoPauloSummary } from "./extractors/SummaryExtractor";
import { extractSaoPauloTaxes } from "./extractors/TaxExtractor";

export class SaoPauloNFeStrategy implements NFeExtractionStrategy {
  private readonly baseUrl = "www.nfce.fazenda.sp.gov.br";

  matches(url: String): boolean {
    return url.includes(this.baseUrl);
  }

  extractGeneralInfo(html: CheerioAPI): GeneralInfoDTO {
    return extractSaoPauloGeneralInfo(html);
  }

  extractIssuer(html: CheerioAPI): SupplierDTO {
    return extractSaoPauloIssuer(html);
  }

  extractProducts(html: CheerioAPI): ProductDTO[] {
    return extractSaoPauloProducts(html);
  }

  extractSummary(html: CheerioAPI): SummaryDTO {
    return extractSaoPauloSummary(html);
  }

  extractTaxes(html: CheerioAPI): TaxDTO {
    return extractSaoPauloTaxes(html);
  }

  getLink(): string {
    return this.baseUrl;
  }
}
