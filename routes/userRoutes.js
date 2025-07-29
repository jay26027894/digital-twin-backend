import express from 'express';
import User from '../models/User.js';
const router = express.Router();

// Create or update user
router.post('/', async (req, res) => {
  const { name, productivityType, workStyle, tools, goals } = req.body;
  const user = await User.findOneAndUpdate(
    { name },
    { name, productivityType, workStyle, tools, goals },
    { upsert: true, new: true }
  );
  res.json(user);
});

// Get user by name
router.get('/:name', async (req, res) => {
  const user = await User.findOne({ name: req.params.name });
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

export default router;
