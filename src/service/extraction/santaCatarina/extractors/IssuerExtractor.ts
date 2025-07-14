import { SupplierDTO } from "../../../../dto/SupplierDTO";
import { CheerioAPI } from "../../common/HttpParser";

export function extractSantaCatarinaIssuer($: CheerioAPI): SupplierDTO {
  const name = getNameSC($);
  const cnpj = getCNPJSC($);
  return { name, cnpj, address: getAddressSC($) };
}

function getNameSC($: CheerioAPI): string {
  const nome = $("#u20").text().trim();
  return nome || "Issuer not found";
}

function getCNPJSC($: CheerioAPI): string {
  const cnpjRaw = $(".text")
    .filter((_, el) => $(el).text().includes("CNPJ:"))
    .first()
    .text();

  const cnpj = cnpjRaw.replace("CNPJ:", "").replace(/\D/g, "");
  return cnpj || "CNPJ not found";
}

function getAddressSC($: CheerioAPI) {
  const addressText = $(".text").eq(1).text().trim();

  const parts = addressText
    .split(",")
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

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
