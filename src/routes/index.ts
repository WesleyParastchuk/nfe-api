import { Router } from "express";
import nfeRoutes from "./NFeRoutes";

const router = Router();

router.use("/", nfeRoutes);

export default router;
