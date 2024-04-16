import express from "express";

import PlannersRouter from "./v1/planners.js";
import PromptRouter from "./v1/prompt.js";

const router = express.Router();
router.use("/planners", PlannersRouter);
router.use("/prompt", PromptRouter);
export default router;
