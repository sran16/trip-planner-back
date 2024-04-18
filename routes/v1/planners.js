import express from "express";
import createError from "http-errors";
import dotenv from "dotenv";
import fetch from "node-fetch";
import { PrismaClient } from "@prisma/client";
dotenv.config();

import PlannersValidator from "../../validators/PlannersValidator.js";
import { string } from "zod";

const router = express.Router();
router.use(express.urlencoded({ extended: true }));
const prisma = new PrismaClient();
const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;
const prePrompt = process.env.PRE_PROMPT;
const mistralApiUrl = process.env.MISTRAL_API_URL;
// Création d'un prompt

router.post("/", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'The field "prompt" is required.' });
  }

  try {
    const mistralResponse = await fetch(mistralApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({
        model: "mistral-small-latest",
        messages: [{ role: "user", content: prePrompt + " " + prompt }],
      }),
    });

    const mistralData = await mistralResponse.json();
    console.log(mistralData.choices[0].message.content);

    const planner = await prisma.planners.create({
      data: {
        prompt,
        itinerary: JSON.parse(mistralData.choices[0].message.content),
      },
    });

    res.status(200).json(planner);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: "An error occurred"});
  }
});

// Modification d'un prompt

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'The field "prompt" is required.' });
  }

  const planner = await prisma.planners.update({
    where: {
      id: String(id),
    },
    data: {
      prompt,
    },
  });

  res.json(planner);
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

export default router;
