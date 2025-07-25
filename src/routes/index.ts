import { Router } from "express";
import nfeRoutes from "./NFeRoutes";

const router = Router();

router.use("/", nfeRoutes);
router.get("/health", (_req, res) => {
    res.status(200).json({
        message: "OK",
        status: "healthy",
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

export default router;
