import * as cheerio from "cheerio";

export type CheerioAPI = ReturnType<typeof cheerio.load>;

export function parseHtml(content: string): CheerioAPI {
  return cheerio.load(content);
}
