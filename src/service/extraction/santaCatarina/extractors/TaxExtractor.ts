import { TaxDTO } from "../../../../dto/TaxDTO";
import { CheerioAPI } from "../../common/HttpParser";

export function extractSantaCatarinaTaxes($: CheerioAPI): TaxDTO {
  const taxText = $("h4:contains('Informações de interesse do contribuinte')")
    .next("ul")
    .find("li")
    .text();

  const federalMatch = taxText.match(/FEDERAL R\$ ([\d,]+)/i);
  const stateMatch = taxText.match(/ESTADUAL R\$ ([\d,]+)/i);
  const municipalMatch = taxText.match(/MUNICIPAL R\$ ([\d,]+)/i);

  const federal = federalMatch
    ? parseFloat(federalMatch[1].replace(",", "."))
    : 0;
  const state = stateMatch ? parseFloat(stateMatch[1].replace(",", ".")) : 0;
  const municipal = municipalMatch
    ? parseFloat(municipalMatch[1].replace(",", "."))
    : 0;

  const totalTaxAmount = federal + state + municipal;

  return {
    totalTaxAmount,
    federal,
    state,
  };
}