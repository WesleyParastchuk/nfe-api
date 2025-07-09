import { NFeExtractionStrategy } from "./NFeExtractionStrategy.interface";
import { ParanaNFeStrategy } from "../extraction/parana/ParanaNFeStrategy";
import { DefaultNFeOrchestrator } from "./DefaultNfeExtractorOrchestrator";
import { DefaultHtmlFetcher } from "./DefaultHtmlFetcher";
import { DefaultNFeAggregator } from "./DefaultNFeAggregator";
import { SaoPauloNFeStrategy } from "../extraction/saoPaulo/SaoPauloNFeStrategy";
import { SantaCatarinaNFeStrategy } from "../extraction/santaCatarina/SantaCatarinaNFeStrategy";

export class NFeStrategyResolver {
  private strategies: NFeExtractionStrategy[] = [new ParanaNFeStrategy(), new SaoPauloNFeStrategy(), new SantaCatarinaNFeStrategy()];

  async execute(url: string): Promise<any> {
    const strategy = this.strategies.find((s) => s.matches(url));
    if (!strategy) throw new Error(`Nenhuma estratégia para URL: ${url}`);

    const orchestrator = new DefaultNFeOrchestrator(
      new DefaultHtmlFetcher(),
      new DefaultNFeAggregator(),
      strategy
    );

    return orchestrator.run(url);
  }
}
