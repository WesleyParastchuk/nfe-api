import { ProductDTO } from "../../../../dto/ProductDTO";
import { CheerioAPI } from "../../common/HttpParser";
import { normalizeUnit } from "../../common/normalizer";

export function extractSaoPauloProducts($: CheerioAPI): ProductDTO[] {
  const products: ProductDTO[] = [];

  $("#tabResult tr").each((_, element) => {
    const name = $(element).find(".txtTit").first().text().trim();

    const rawCode = $(element).find(".RCod").text();
    const code = rawCode
      .replace(/\(Código:\s?/, "")
      .replace(")", "")
      .trim();

    const rawQty = $(element).find(".Rqtd").text().replace("Qtde.:", "").trim();
    const quantity = parseFloat(rawQty.replace(",", ".")) || 0;

    const unit = normalizeUnit(
      $(element).find(".RUN").text().replace("UN:", "").trim()
    );

    const rawUnitPrice = $(element)
      .find(".RvlUnit")
      .text()
      .replace("Vl. Unit.:", "")
      .trim();
    const unitPrice = parseFloat(rawUnitPrice.replace(",", ".")) || 0;

    const rawTotalPrice = $(element).find(".valor").text().trim();
    const totalPrice = parseFloat(rawTotalPrice.replace(",", ".")) || 0;

    if (name && code) {
      products.push({
        name,
        code,
        quantity,
        unit,
        unitPrice,
        totalPrice,
      });
    }
  });

  return products;
}
