import { TaxDTO } from "../../../../dto/TaxDTO";
import { CheerioAPI } from "../../common/HttpParser";

export function extractParanaTaxes($: CheerioAPI): TaxDTO {
  const totalTaxRaw = $("#linhaTotal.spcTop .totalNumb.txtObs").text().trim();
  const totalTaxAmount = parseFloat(totalTaxRaw.replace(",", ".")) || 0;

  const taxInfoText = $("#infos li")
    .filter((_, el) => $(el).text().includes("Trib aprox"))
    .text()
    .trim();

  const federalMatch = taxInfoText.match(
    /Trib aprox R\$:\s*([\d,]+)\s*Federal/
  );
  const stateMatch = taxInfoText.match(/R\$:\s*([\d,]+)\s*Estadual/);

  const federal = federalMatch
    ? parseFloat(federalMatch[1].replace(",", "."))
    : 0;
  const state = stateMatch ? parseFloat(stateMatch[1].replace(",", ".")) : 0;

  return {
    totalTaxAmount,
    federal,
    state,
  };
}
