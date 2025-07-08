import { HtmlFetcher } from "./contracts/HtmlFetcher";

export class DefaultHtmlFetcher implements HtmlFetcher {
    async fetch (url: string): Promise<string> {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch HTML from ${url}: ${response.statusText}`);
        }
        return await response.text();
    }
}