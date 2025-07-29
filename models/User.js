import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  productivityType: String,
  workStyle: String,
  tools: [String],
  goals: String,
  streak: Number,
  habits: [{ name: String, completedToday: Boolean }],
});

export default mongoose.model('User', userSchema);
