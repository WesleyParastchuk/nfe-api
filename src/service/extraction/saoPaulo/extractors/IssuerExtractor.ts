import { SupplierDTO } from "../../../../dto/SupplierDTO";
import { CheerioAPI } from "../../common/HttpParser";

export function extractSaoPauloIssuer($: CheerioAPI): SupplierDTO {
  const name = getNameSP($);
  const cnpj = getCNPJSP($);
  return { name, cnpj, address: getAddressSP($) };
}

function getNameSP($: CheerioAPI): string {
  const nome = $("#u20").text().trim().toUpperCase();
  return nome || "ISSUER NOT FOUND";
}

function getCNPJSP($: CheerioAPI): string {
  const cnpjRaw = $("#conteudo > div.txtCenter > div:nth-child(2)").text().trim();
  const cnpj = cnpjRaw.replace(/\D/g, "");
  return cnpj.toUpperCase() || "CNPJ NOT FOUND";
}

function getAddressSP($: CheerioAPI) {
  const addressText = $("#conteudo > div.txtCenter > div:nth-child(3)").text().trim().toUpperCase();
  const parts = addressText.split(',').map(p => p.trim()).filter(p => p.length > 0);

  if (parts.length < 4) {
    throw new Error("UNEXPECTED ADDRESS FORMAT FOR NFC-E SP.");
  }

  const [street, number, district, city, uf] = parts;

  return {
    street: street,
    number: number,
    complement: "",
    district: district,
    city: city,
    uf: uf,
  };
}