import { GeneralInfoDTO } from "../../../../dto/GeneralInfoDTO";
import { CheerioAPI } from "../../common/HttpParser";

function parseDateToTimestamp(dateStr: string): number {
  const [date, time] = dateStr.trim().split(" ");
  const [day, month, year] = date.split("/");
  return new Date(`${year}-${month}-${day}T${time}`).getTime();
}

export function extractSaoPauloGeneralInfo($: CheerioAPI): GeneralInfoDTO {
  const infoElement = $("#infos")
    .find("h4:contains('Informações gerais da Nota')")
    .next("ul")
    .find("li");

  const infoText = infoElement.text().replace(/\s\s+/g, " ").trim();

  const emissionType = infoText.split("EMISSÃO NORMAL")[0] + "EMISSÃO NORMAL";
  const numberMatch = infoText.match(/Número: (\d+)/);
  const seriesMatch = infoText.match(/Série: (\d+)/);
  const emissionDateMatch = infoText.match(/Emissão: ([\d\/]+\s[\d:]+)/);
  const authorizationProtocolMatch = infoText.match(
    /Protocolo de Autorização: (\d+)/
  );
  const protocolDateMatch = infoText.match(
    /(\d{2}\/\d{2}\/\d{4}\s\d{2}:\d{2}:\d{2})/
  );
  const environmentMatch = infoText.match(/Ambiente de (Produção|Homologação)/);
  const xmlVersionMatch = infoText.match(/Versão XML: ([\d\.]+)/);
  const xsltVersionMatch = infoText.match(/Versão XSLT: ([\d\.]+)/);

  return {
    emissionType: emissionType ? "EMISSÃO NORMAL" : "",
    invoiceNumber: numberMatch ? parseInt(numberMatch[1], 10) : 0,
    series: seriesMatch ? parseInt(seriesMatch[1], 10) : 0,
    emissionDate: emissionDateMatch
      ? parseDateToTimestamp(emissionDateMatch[1])
      : 0,
    authorizationProtocol: authorizationProtocolMatch
      ? authorizationProtocolMatch[1]
      : "",
    protocolDate: protocolDateMatch
      ? parseDateToTimestamp(protocolDateMatch[0])
      : 0,
    environment: environmentMatch ? environmentMatch[1] : "",
    xmlVersion: xmlVersionMatch ? xmlVersionMatch[1] : "",
    xsltVersion: xsltVersionMatch ? xsltVersionMatch[1] : "",
  };
}
