import express from "express";

const router = express.Router();

// GET /calendar - Returns mock calendar data for now
router.get("/", async (req, res) => {
  // You can replace this with real data aggregation later
  res.json({
    message: "Calendar endpoint is working!",
    events: [
      { id: 1, title: "Sample Event", date: "2025-07-30" }
    ]
  });
});

export default router;
