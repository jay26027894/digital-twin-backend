import express from "express";
import { getEntriesByDate } from "../controllers/entries.js";

const router = express.Router();

router.get("/:date", getEntriesByDate);

export default router;
import Task from "../models/task.js";
import Habit from "../models/habit.js";

export const getEntriesByDate = async (req, res) => {
  const { date } = req.params; // Format: YYYY-MM-DD

  try {
    const tasks = await Task.find({ date }); // Ensure your Task schema includes `date`
    const habits = await Habit.find({ date }); // Same here
    res.json({ tasks: tasks.map(t => t.name), habits: habits.map(h => h.name) });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch entries" });
  }
};
