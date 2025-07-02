export interface NFeExtractionStrategy {
  matches(url: String): boolean;
  execute(url: String): Promise<any>;
}
