import { GeneralInfoDTO } from "../../../../dto/GeneralInfoDTO";
import { CheerioAPI } from "../../common/HttpParser";

function parseDateToTimestamp(dateStr: string): number {
  const [date, time] = dateStr.trim().split(" ");
  const [day, month, year] = date.split("/");
  return new Date(`${year}-${month}-${day}T${time}`).getTime();
}

export function extractSaoPauloGeneralInfo($: CheerioAPI): GeneralInfoDTO {
  const rawText = $("#conteudo").text().replace(/\s+/g, " ").trim();

  const emissionTypeMatch = rawText.match(/Tipo de Emissão:\s*([A-Z\s]+)/i);
  const numberMatch = rawText.match(/Número:\s*(\d+)/i);
  const seriesMatch = rawText.match(/Série:\s*(\d+)/i);
  const emissionDateMatch = rawText.match(/Data de Emissão:\s*([\d/]+\s[\d:]+)/i);
  const protocolMatch = rawText.match(/Protocolo de Autorização:\s*(\d+)/i);
  const protocolDateMatch = rawText.match(/Protocolo de Autorização:\s*\d+\s+([\d/]+\s[\d:]+)/i);
  const envMatch = rawText.match(/Ambiente:\s*(Produção|Homologação)/i);
  const xmlVersionMatch = rawText.match(/Versão do XML:\s*([\d.]+)/i);
  const xsltVersionMatch = rawText.match(/Versão do XSLT:\s*([\d.]+)/i);

  return {
    emissionType: emissionTypeMatch?.[1].trim() ?? "",
    invoiceNumber: numberMatch ? parseInt(numberMatch[1], 10) : 0,
    series: seriesMatch ? parseInt(seriesMatch[1], 10) : 0,
    emissionDate: emissionDateMatch
      ? parseDateToTimestamp(emissionDateMatch[1])
      : 0,
    authorizationProtocol: protocolMatch?.[1] ?? "",
    protocolDate: protocolDateMatch
      ? parseDateToTimestamp(protocolDateMatch[1])
      : 0,
    environment: envMatch?.[1] ?? "",
    xmlVersion: xmlVersionMatch?.[1] ?? "",
    xsltVersion: xsltVersionMatch?.[1] ?? "",
  };
}

