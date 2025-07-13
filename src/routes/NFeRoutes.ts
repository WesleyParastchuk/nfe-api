import { Router } from "express";
import { getFull } from "../controllers/NFeController";

const router = Router();

router.post("/", getFull);

export default router;
