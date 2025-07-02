import { Request, Response } from "express";
import { NFeStrategyResolver } from "../service/nfeServices/NFeStrategyResolver";
import { extractNFeData } from "../service/extraction/NFeExtractor";

export const getFull = async (req: Request, res: Response) => {
  const { url } = req.body;

  const resolver = new NFeStrategyResolver();
  const site = await resolver.execute(url);

  const data = extractNFeData(site);

  res.json(data );
};
