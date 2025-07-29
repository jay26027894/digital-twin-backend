import express from "express";
import { 
  createBehavior, 
  getBehaviors, 
  getBehavior, 
  updateBehavior, 
  deleteBehavior, 
  getAnalytics 
} from "../controllers/behaviorController.js";

const router = express.Router();

// Create new behavior entry
router.post("/", createBehavior);

// Get all behaviors for a user
router.get("/user/:userId", getBehaviors);

// Get analytics for a user
router.get("/analytics/:userId", getAnalytics);

// Get behavior by ID
router.get("/:id", getBehavior);

// Update behavior
router.put("/:id", updateBehavior);

// Delete behavior
router.delete("/:id", deleteBehavior);

export default router; 