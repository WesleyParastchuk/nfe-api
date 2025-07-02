import { CompleteNFeDTO } from '../../dto/CompleteNFeDTO';
import { GeneralInfoDTO } from './../../dto/GeneralInfoDTO';
import { extractGeneralInfo } from './extractors/GeneralInfoExtractor';
import { extractIssuer } from "./extractors/IssuerExtractor";
import { extractProducts } from "./extractors/ProductExtractor";
import { extractSummary } from "./extractors/SummaryExtractor";
import { extractTaxes } from "./extractors/TaxExtractor";
import { parseHtml } from "./HttpParser";

export function extractNFeData(html: string): CompleteNFeDTO {
  const $ = parseHtml(html);

  return {
    issuer: extractIssuer($),
    products: extractProducts($),
    summary: extractSummary($),
    tax: extractTaxes($),
    generalInfo: extractGeneralInfo($),
  };
}
