import { z } from "zod";

const PlannersValidator = z.object({
  prompt: z.string(),
  itinerary: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export default PlannersValidator;
