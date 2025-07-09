import { SummaryDTO } from "../../../../dto/SummaryDTO";
import { CheerioAPI } from "../../common/HttpParser";

export function extractSaoPauloSummary($: CheerioAPI): SummaryDTO {
  const summaryText = $("#totalNota").text().replace(/\s+/g, " ").trim();

  const totalItemsMatch = summaryText.match(/Qtd\. total de itens:\s*(\d+)/i);
  const totalItems = totalItemsMatch ? parseInt(totalItemsMatch[1], 10) : 0;

  const totalAmountRaw = $("span.totalNumb.txtMax").first().text().trim();
  const totalAmount = parseFloat(totalAmountRaw.replace(",", ".")) || 0;

  const paymentLabel = $("#totalNota label.tx").first();
  const paymentMethod = paymentLabel.text().trim();

  const amountPaidRaw = paymentLabel.siblings("span.totalNumb").first().text().trim();
  const amountPaid = parseFloat(amountPaidRaw.replace(",", ".")) || 0;

  return {
    totalItems,
    totalAmount,
    amountPaid,
    paymentMethod,
  };
}
