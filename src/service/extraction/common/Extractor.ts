import { CheerioAPI } from "./HttpParser";

export interface Extractor<T> {
  extract(html: CheerioAPI): T;
}
