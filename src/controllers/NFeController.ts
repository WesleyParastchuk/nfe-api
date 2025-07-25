import { Request, Response } from "express";
import { NFeStrategyResolver } from "../service/nfeServices/NFeStrategyResolver";

export const getFull = async (req: Request, res: Response) => {
  const { url } = req.body;

  const resolver = new NFeStrategyResolver();
  const json = await resolver.execute(url);

  res.json(json);
};

export const getSupports = async (req: Request, res: Response) => {
  const resolver = new NFeStrategyResolver();
  const supports = resolver.getStrategiesLinks();

  res.json(supports);
}