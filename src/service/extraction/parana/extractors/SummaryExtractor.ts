import { SummaryDTO } from "../../../../dto/SummaryDTO";
import { CheerioAPI } from "../../common/HttpParser";

export function extractParanaSummary($: CheerioAPI): SummaryDTO {
  const totalItemsRaw = $("#totalNota #linhaTotal .totalNumb")
    .first()
    .text()
    .trim();
  const totalAmountRaw = $(
    "#totalNota #linhaTotal.linhaShade .totalNumb.txtMax"
  )
    .text()
    .trim();

  const paymentMethod = $("#totalNota #linhaTotal label.tx").text().trim();
  const amountPaidRaw = $("#totalNota #linhaTotal label.tx")
    .parent()
    .find("span.totalNumb")
    .text()
    .trim();

  const totalItems = parseInt(totalItemsRaw.replace(/\D/g, ""), 10) || 0;
  const totalAmount = parseFloat(totalAmountRaw.replace(",", ".")) || 0;
  const amountPaid = parseFloat(amountPaidRaw.replace(",", ".")) || 0;

  return {
    totalItems,
    totalAmount,
    amountPaid,
    paymentMethod,
  };
}
