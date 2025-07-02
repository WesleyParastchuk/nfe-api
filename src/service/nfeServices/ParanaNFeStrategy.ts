import axios from "axios";
import { NFeExtractionStrategy } from "./NFeExtractionStrategy.interface";

export class ParanaNFeStrategy implements NFeExtractionStrategy {
  readonly baseUrl = "www.fazenda.pr.gov.br";
  readonly url = `https://www.fazenda.pr.gov.br/nfce/qrcode?p=`;

  matches(url: String): boolean {
    return url.includes(this.baseUrl);
  }

  async execute(url: String): Promise<any> {
    const page = await axios.get(`${url}`);

    return page.data;
  }
}
