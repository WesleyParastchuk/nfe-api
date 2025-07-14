import { SupplierDTO } from "../../../../dto/SupplierDTO";
import { CheerioAPI } from "../../common/HttpParser";

export function extractSaoPauloIssuer($: CheerioAPI): SupplierDTO {
  const name = getNameSP($);
  const cnpj = getCNPJSP($);
  return { name, cnpj, address: getAddressSP($) };
}

function getNameSP($: CheerioAPI): string {
  const nome = $("#u20").text().trim();
  return nome || "Issuer not found";
}

function getCNPJSP($: CheerioAPI): string {
  const cnpjRaw = $(".text")
    .filter((_, el) => $(el).text().includes("CNPJ:"))
    .first()
    .text();

  const cnpj = cnpjRaw.replace("CNPJ:", "").replace(/\D/g, "");
  return cnpj || "CNPJ not found";
}

function getAddressSP($: CheerioAPI) {
  const addressText = $(".text").eq(1).text().trim();

  const parts = addressText
    .split(",")
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  if (parts.length < 4) {
    throw new Error("Formato de endereço inesperado para NFC-e SP.");
  }

  const [street, number, , district, city, state] = parts;

  return {
    street,
    number,
    complement: "",
    district,
    city,
    uf: state,
  };
}
