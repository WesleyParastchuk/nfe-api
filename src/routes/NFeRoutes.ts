import { Router } from "express";
import { getFull } from "../controllers/NFeController";

const router = Router();

router.get("/supports", getFull);
router.post("/", getFull);

export default router;
