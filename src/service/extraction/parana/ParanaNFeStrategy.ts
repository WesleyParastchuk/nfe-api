import { GeneralInfoDTO } from "./../../../dto/GeneralInfoDTO";
import { NFeExtractionStrategy } from "../../nfeServices/NFeExtractionStrategy.interface";
import { SupplierDTO } from "../../../dto/SupplierDTO";
import { ProductDTO } from "../../../dto/ProductDTO";
import { SummaryDTO } from "../../../dto/SummaryDTO";
import { TaxDTO } from "../../../dto/TaxDTO";
import { CheerioAPI } from "../common/HttpParser";
import { extractParanaGeneralInfo } from "./extractors/GeneralInfoExtractor";
import { extractParanaIssuer } from "./extractors/IssuerExtractor";
import { extractParanaProducts } from "./extractors/ProductExtractor";
import { extractParanaSummary } from "./extractors/SummaryExtractor";
import { extractParanaTaxes } from "./extractors/TaxExtractor";

export class ParanaNFeStrategy implements NFeExtractionStrategy {
  private readonly baseUrl = "www.fazenda.pr.gov.br";

  matches(url: String): boolean {
    return url.includes(this.baseUrl);
  }

  extractGeneralInfo(html: CheerioAPI): GeneralInfoDTO {
    return extractParanaGeneralInfo(html);
  }

  extractIssuer(html: CheerioAPI): SupplierDTO {
    return extractParanaIssuer(html);
  }

  extractProducts(html: CheerioAPI): ProductDTO[] {
    return extractParanaProducts(html);
  }

  extractSummary(html: CheerioAPI): SummaryDTO {
    return extractParanaSummary(html);
  }

  extractTaxes(html: CheerioAPI): TaxDTO {
    return extractParanaTaxes(html);
  }

  getLink(): string {
    return this.baseUrl;
  }
}
