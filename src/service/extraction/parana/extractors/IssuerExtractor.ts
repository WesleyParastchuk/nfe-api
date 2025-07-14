import { SupplierDTO } from "../../../../dto/SupplierDTO";
import { CheerioAPI } from "../../common/HttpParser";

export function extractParanaIssuer($: CheerioAPI): SupplierDTO {
  const name = getName($);
  const cnpj = getCNPJ($);

  return { name, cnpj, address: getAddress($) };
}

function getName($: CheerioAPI): string {
  const nome = $("#u20.txtTopo").text().trim();
  return nome || "Issuer not found";
}

function getCNPJ($: CheerioAPI): string {
  const cnpjRaw = $(".text").first().text();
  const cnpj = cnpjRaw.replace("CNPJ:", "").replace(/\D/g, "");
  return cnpj || "CNPJ not found";
}

function getAddress($: CheerioAPI) {
  const rawAddress = $(".text").eq(1).text().trim();

  const parts = rawAddress
    .split(",")
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  if (parts.length < 5) {
    throw new Error("Unexpected address format.");
  }

  const [
    street,
    number,
    possibleComplementOrDistrict,
    districtOrCity,
    ufOrCity,
  ] = parts;

  let complement = "";
  let district = "";
  let city = "";
  let state = ufOrCity;

  if (parts.length === 5) {
    district = possibleComplementOrDistrict;
    city = districtOrCity;
  } else if (parts.length === 6) {
    complement = possibleComplementOrDistrict;
    district = districtOrCity;
    city = parts[4];
    state = parts[5];
  } else {
    throw new Error("Unrecognized address structure.");
  }

  return {
    street,
    number,
    complement,
    district,
    city,
    uf: state,
  };
}
