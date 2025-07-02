import { Router } from "express";
import { getFull } from "../controllers/NFeController";

const router = Router();

router.get("/", getFull);

export default router;
