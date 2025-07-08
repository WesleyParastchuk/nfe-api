import { CompleteNFeDTO } from "../../dto/CompleteNFeDTO";
import { parseHtml } from "../extraction/common/HttpParser";
import { HtmlFetcher } from "./contracts/HtmlFetcher";
import { NFeAggregator } from "./contracts/NFeAggregator";
import { NFeExtractorOrchestrator } from "./contracts/NfeExtractorOrchestrator";
import { NFeExtractionStrategy } from "./NFeExtractionStrategy.interface";

export class DefaultNFeOrchestrator implements NFeExtractorOrchestrator {
  constructor(
    private readonly fetcher: HtmlFetcher,
    private readonly aggregator: NFeAggregator,
    private readonly strategy: NFeExtractionStrategy
  ) {}

  async run(url: string): Promise<CompleteNFeDTO> {
    const content = await this.fetcher.fetch(url);
    
    const html = parseHtml(content);

    const [generalInfo, issuer, products, summary, taxes] = await Promise.all([
      this.strategy.extractGeneralInfo(html),
      this.strategy.extractIssuer(html),
      this.strategy.extractProducts(html),
      this.strategy.extractSummary(html),
      this.strategy.extractTaxes(html),
    ]);

    return this.aggregator.aggregate(
      generalInfo,
      issuer,
      products,
      summary,
      taxes
    );
  }
}
