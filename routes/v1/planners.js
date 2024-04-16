import express from "express";
import createError from "http-errors";
import { PrismaClient } from "@prisma/client";

import PlannersValidator from "../../validators/PlannersValidator.js";
import { string } from "zod";

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
const prisma = new PrismaClient();


// appeler l api de mistral depuis le back

// router.post("/", async (req, res) => {
//   const response = await fetch(
//     `https://api.mistral.ai/v1/chat/completions/${apiKey}`,
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${apiKey}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(req.body),
//     }
//   );
// });

// Création d'un prompt

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

// Récupération des prompts

router.get("/", async (req, res) => {
  const entries = await prisma.planners.findMany();
  res.json(entries);
});

// Récupération d'un prompt
router.get("/:id", async (req, res) => {
  const entry = await prisma.planners.findUnique({
    where: {
      id: String(req.params.id),
    },
  });

  if (!entry) {
    throw createError(404, "Planner not found");
  }

  res.json(entry);
});

// Modification d'un prompt

router.patch("/:id", async (req, res) => {
  let planners;

  try {
    planners = PlannersValidator.parse(req.body);
  } catch (error) {
    return res.status(400).json({ errors: error.issues });
  }

  const entry = await prisma.planners.update({
    where: {
      id: String(req.params.id),
    },
    data: {
      prompt: planners.prompt,
      itinerary: planners.itinerary,
    },
  });

  res.json(entry);
});

export default router;
