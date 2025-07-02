import { NFeExtractionStrategy } from "./NFeExtractionStrategy.interface";
import { ParanaNFeStrategy } from "./ParanaNFeStrategy";

export class NFeStrategyResolver {
  private strategies: NFeExtractionStrategy[] = [new ParanaNFeStrategy()];

  async execute(url: string): Promise<any> {
    const strategy = this.strategies.find((s) => s.matches(url));
    if (!strategy) throw new Error(`Nenhuma estratégia para URL: ${url}`);
    return strategy.execute(url);
  }
}
