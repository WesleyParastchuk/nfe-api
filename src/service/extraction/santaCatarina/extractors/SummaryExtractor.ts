import { SummaryDTO } from "../../../../dto/SummaryDTO";
import { CheerioAPI } from "../../common/HttpParser";

export function extractSantaCatarinaSummary($: CheerioAPI): SummaryDTO {
  const totalItemsLabel = $("#totalNota label:contains('Qtd. total de itens:')");
  const totalItemsRaw = totalItemsLabel.next("span.totalNumb").text().trim();
  const totalItems = parseInt(totalItemsRaw, 10) || 0;

  const totalAmountRaw = $("span.totalNumb.txtMax").first().text().trim();
  const totalAmount = parseFloat(totalAmountRaw.replace(",", ".")) || 0;

  const paymentMethodLabel = $("#totalNota label.tx").first();
  const paymentMethod = paymentMethodLabel.text().trim();

  const amountPaidRaw = paymentMethodLabel.next("span.totalNumb").text().trim();
  const amountPaid = parseFloat(amountPaidRaw.replace(",", ".")) || 0;

  return {
    totalItems,
    totalAmount,
    amountPaid,
    paymentMethod,
  };
}