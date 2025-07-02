import { GeneralInfoDTO } from "../../../dto/GeneralInfoDTO";
import { CheerioAPI } from "../HttpParser";

function parseDateToTimestamp(dateStr: string): number {
  const [date, time] = dateStr.trim().split(" ");
  const [day, month, year] = date.split("/");
  return new Date(`${year}-${month}-${day}T${time}`).getTime();
}

export function extractGeneralInfo($: CheerioAPI): GeneralInfoDTO {
  const infoSection = $("#infos li")
    .filter((_, el) => $(el).text().includes("EMISSÃO"))
    .text()
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const emissionTypeMatch = infoSection.match(/(EMISSÃO [A-Z]+)/);
  const numberMatch = infoSection.match(/Número:\s*(\d+)/);
  const seriesMatch = infoSection.match(/Série:\s*(\d+)/);
  const emissionDateMatch = infoSection.match(/Emissão:\s*([\d/]+\s[\d:]+)/);
  const protocolMatch = infoSection.match(/Protocolo de Autorização:\s*(\d+)/);
  const protocolDateMatch = infoSection.match(/Protocolo de Autorização:\s*\d+\s+([\d/]+\s[\d:]+)/);
  const envMatch = infoSection.match(/Ambiente de (Produção|Homologação)/);
  const xmlVersionMatch = infoSection.match(/XML:\s*([\d.]+)/);
  const xsltVersionMatch = infoSection.match(/XSLT:\s*([\d.]+)/);

  return {
    emissionType: emissionTypeMatch?.[1] ?? "",
    invoiceNumber: numberMatch ? parseInt(numberMatch[1], 10) : 0,
    series: seriesMatch ? parseInt(seriesMatch[1], 10) : 0,
    emissionDate: emissionDateMatch ? parseDateToTimestamp(emissionDateMatch[1]) : 0,
    authorizationProtocol: protocolMatch?.[1] ?? "",
    protocolDate: protocolDateMatch ? parseDateToTimestamp(protocolDateMatch[1]) : 0,
    environment: envMatch?.[1] ?? "",
    xmlVersion: xmlVersionMatch?.[1] ?? "",
    xsltVersion: xsltVersionMatch?.[1] ?? "",
  };
}