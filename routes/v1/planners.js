import express from "express";
import createError from "http-errors";
import { PrismaClient } from "@prisma/client";
import PlannersValidator from "../../validators/PlannersValidator.js";

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
const prisma = new PrismaClient();

// Création de prompt

router.post("/", async (req, res) => {
  let planners;

  try {
    planners = PlannersValidator.parse(req.body);
  } catch (error) {
    return res.status(400).json({ errors: error.issues });
  }

  const entry = await prisma.planners.create({
    data: {
      prompt: planners.prompt,
      itinerary: planners.itinerary,
      createdAt: planners.createdAt,
      updatedAt: planners.updatedAt,
    },
  });

  res.json(entry);
});

// Récupération de prompt

router.get("/planners", async (req, res) => {
  const entries = await prisma.planners.findMany();
  res.json(entries);
});

export default router;
