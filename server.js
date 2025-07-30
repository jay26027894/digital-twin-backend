import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cohere from "cohere-ai";

// Import routes
import personaRoutes from "./routes/persona.js";
import behaviorRoutes from "./routes/behavior.js";
import taskRoutes from "./routes/taskRoutes.js";
import suggestionsRoutes from "./routes/suggestions.js";
import calendarRoutes from "./routes/calendar.js";

dotenv.config();
const app = express();

// Set Cohere API key
cohere.apiKey = process.env.COHERE_API_KEY;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true
}));
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use("/api/persona", personaRoutes);
app.use("/api/behavior", behaviorRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/suggestions", suggestionsRoutes);
app.use("/api/calendar", calendarRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "DigiTwin API is running (MongoDB mode)",
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: "Something went wrong!",
    message: process.env.NODE_ENV === "development" ? err.message : "Internal server error"
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 DigiTwin API server running on http://localhost:${PORT}`);
});
