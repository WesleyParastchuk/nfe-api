import { CompleteNFeDTO } from "../../dto/CompleteNFeDTO";
import { NFeAggregator } from "./contracts/NFeAggregator";

export class DefaultNFeAggregator implements NFeAggregator {
  aggregate(
    generalInfo: CompleteNFeDTO["generalInfo"],
    issuer: CompleteNFeDTO["supplier"],
    products: CompleteNFeDTO["products"],
    summary: CompleteNFeDTO["summary"],
    tax: CompleteNFeDTO["tax"]
  ): CompleteNFeDTO {
    return {
      generalInfo: generalInfo,
      supplier: issuer,
      products: products,
      summary: summary,
      tax: tax,
    };
  }
}
