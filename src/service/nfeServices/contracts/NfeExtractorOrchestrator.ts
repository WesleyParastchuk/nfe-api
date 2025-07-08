import { CompleteNFeDTO } from "../../../dto/CompleteNFeDTO";

export interface NFeExtractorOrchestrator {
  run(url: string): Promise<CompleteNFeDTO>;
}
