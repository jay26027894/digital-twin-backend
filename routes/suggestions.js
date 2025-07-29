import express from "express";
import cohere from "cohere-ai";
import dotenv from "dotenv";

dotenv.config();

cohere.apiKey = process.env.COHERE_API_KEY;

const router = express.Router();

// Example: Generate suggestions
router.post("/generate", async (req, res) => {
  try {
    const prompt = "Give 3 short productivity suggestions for a digital twin app user. Keep them motivational and practical.";
    const response = await cohere.generate({
      model: "command",
      prompt,
      max_tokens: 100,
      temperature: 0.8,
    });
    const suggestions = response.body.generations[0].text.trim().split("\n").filter(Boolean);
    res.json({ suggestions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Suggestion generation failed." });
  }
});

export default router;
