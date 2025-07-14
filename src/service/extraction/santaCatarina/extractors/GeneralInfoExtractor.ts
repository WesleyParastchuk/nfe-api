import { GeneralInfoDTO } from "../../../../dto/GeneralInfoDTO";
import { CheerioAPI } from "../../common/HttpParser";

function parseDateToTimestamp(dateStr: string): number {
  const [date, time] = dateStr.trim().split(" ");
  const [day, month, year] = date.split("/");
  return new Date(`${year}-${month}-${day}T${time}`).getTime();
}

export function extractSantaCatarinaGeneralInfo($: CheerioAPI): GeneralInfoDTO {
  const infoText = $("#infos ul li").first().text().replace(/\s+/g, " ").trim();

  const emissionType = /EMISSÃO\s+NORMAL/i.test(infoText) ? "Normal" : "";

  const numberMatch = infoText.match(/Número:\s*(\d+)/i);
  const seriesMatch = infoText.match(/Série:\s*(\d+)/i);
  const emissionDateMatch = infoText.match(/Emissão:\s*([\d/]+\s[\d:]+)/i);
  const protocolMatch = infoText.match(/Protocolo de Autorização:\s*(\d+)/i);
  const protocolDateMatch = infoText.match(
    /Protocolo de Autorização:\s*\d+\s+([\d/]+\s[\d:]+)/i
  );

  const ambienteRaw = infoText.match(/Ambiente de\s+(Produção|Homologação)/i);
  const xmlMatch = infoText.match(/Versão XML:\s*([\d.]+)/i);
  const xsltMatch = infoText.match(/Versão XSLT:\s*([\d.]+)/i);

  return {
    emissionType,
    invoiceNumber: numberMatch ? parseInt(numberMatch[1], 10) : 0,
    series: seriesMatch ? parseInt(seriesMatch[1], 10) : 0,
    emissionDate: emissionDateMatch
      ? parseDateToTimestamp(emissionDateMatch[1])
      : 0,
    authorizationProtocol: protocolMatch?.[1] ?? "",
    protocolDate: protocolDateMatch
      ? parseDateToTimestamp(protocolDateMatch[1])
      : 0,
    environment: ambienteRaw?.[1] ?? "",
    xmlVersion: xmlMatch?.[1] ?? "",
    xsltVersion: xsltMatch?.[1] ?? "",
  };
}
