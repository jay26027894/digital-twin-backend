import express from "express";
import { 
  createPersona, 
  getPersona, 
  getLatestPersona,
  updatePersona, 
  deletePersona 
} from "../controllers/personaController.js";

const router = express.Router();

// Create new persona
router.post("/", createPersona);

// Get latest persona
router.get("/latest", getLatestPersona);

// Get persona by ID
router.get("/:id", getPersona);

// Update persona
router.put("/:id", updatePersona);

// Delete persona
router.delete("/:id", deletePersona);

export default router;
