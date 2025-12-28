import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from "../config.js";

const router = express.Router();

let model;

try {
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });
  console.log("✅ Gemini model initialized");
} catch (err) {
  console.error("❌ Gemini init failed:", err);
}

router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    console.error("❌ No message received");
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const result = await model.generateContent(message);
    const reply = result.response.text();
    res.json({ reply });
    
  } catch (error) {
    console.error("❌ GEMINI API ERROR FULL:", error);
    console.error("❌ Message:", error.message);

    res.status(500).json({
      error: error.message,
    });
  }
});

export default router;
