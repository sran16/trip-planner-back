import express from "express";

import PlannersRouter from "./v1/planners.js";

const router = express.Router();
router.use("/planners", PlannersRouter);
export default router;
