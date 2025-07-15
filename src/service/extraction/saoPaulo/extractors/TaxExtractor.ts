import { TaxDTO } from "../../../../dto/TaxDTO";
import { CheerioAPI } from "../../common/HttpParser";

export function extractSaoPauloTaxes($: CheerioAPI): TaxDTO {
  const taxLabel = $("#totalNota label:contains('Informação dos Tributos Totais Incidentes')");
  
  const totalTaxText = taxLabel.siblings('span.totalNumb').text().trim();

  const totalTaxAmount = parseFloat(totalTaxText.replace(",", "."));

  return {
    totalTaxAmount: isNaN(totalTaxAmount) ? 0 : totalTaxAmount,
    federal: 0,
    state: 0,
  };
}