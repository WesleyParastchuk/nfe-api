import { GeneralInfoDTO } from "../../../dto/GeneralInfoDTO";
import { NFeExtractionStrategy } from "../../nfeServices/NFeExtractionStrategy.interface";
import { SupplierDTO } from "../../../dto/SupplierDTO";
import { ProductDTO } from "../../../dto/ProductDTO";
import { SummaryDTO } from "../../../dto/SummaryDTO";
import { TaxDTO } from "../../../dto/TaxDTO";
import { CheerioAPI } from "../common/HttpParser";
import { extractSantaCatarinaGeneralInfo } from "./extractors/GeneralInfoExtractor";
import { extractSantaCatarinaIssuer } from "./extractors/IssuerExtractor";
import { extractSantaCatarinaProducts } from "./extractors/ProductExtractor";
import { extractSantaCatarinaSummary } from "./extractors/SummaryExtractor";
import { extractSantaCatarinaTaxes } from "./extractors/TaxExtractor";

export class SantaCatarinaNFeStrategy implements NFeExtractionStrategy {
  private readonly baseUrl = "sat.sef.sc.gov.br";

  matches(url: String): boolean {
    return url.includes(this.baseUrl);
  }

  extractGeneralInfo(html: CheerioAPI): GeneralInfoDTO {
    return extractSantaCatarinaGeneralInfo(html);
  }

  extractIssuer(html: CheerioAPI): SupplierDTO {
    return extractSantaCatarinaIssuer(html);
  }

  extractProducts(html: CheerioAPI): ProductDTO[] {
    return extractSantaCatarinaProducts(html);
  }

  extractSummary(html: CheerioAPI): SummaryDTO {
    return extractSantaCatarinaSummary(html);
  }

  extractTaxes(html: CheerioAPI): TaxDTO {
    return extractSantaCatarinaTaxes(html);
  }

  getLink(): string {
    return this.baseUrl;
  }
}
