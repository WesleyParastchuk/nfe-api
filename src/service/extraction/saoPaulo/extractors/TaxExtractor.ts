import { TaxDTO } from "../../../../dto/TaxDTO";
import { CheerioAPI } from "../../common/HttpParser";

export function extractSaoPauloTaxes($: CheerioAPI): TaxDTO {
  const rawText = $("#conteudo").text().replace(/\s+/g, " ").trim();

  const totalMatch = rawText.match(/Trib aprox R\$:\s*([\d,]+)/i);
  const federalMatch = rawText.match(/Federal:\s*([\d,]+)/i);
  const stateMatch = rawText.match(/Estadual:\s*([\d,]+)/i);

  const totalTaxAmount = totalMatch
    ? parseFloat(totalMatch[1].replace(",", "."))
    : 0;

  const federal = federalMatch
    ? parseFloat(federalMatch[1].replace(",", "."))
    : 0;

  const state = stateMatch
    ? parseFloat(stateMatch[1].replace(",", "."))
    : 0;

  return {
    totalTaxAmount,
    federal,
    state,
  };
}
