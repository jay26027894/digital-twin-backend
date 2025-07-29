import mongoose from "mongoose";

const behaviorSchema = new mongoose.Schema({
  // Basic Information
  userId: { type: String, required: true }, // For future user system
  date: { type: Date, required: true },
  
  // Time Tracking
  sleep: { type: Number, min: 0, max: 12, default: 0 },
  screenTime: { type: Number, min: 0, max: 16, default: 0 },
  workHours: { type: Number, min: 0, max: 16, default: 0 },
  meals: { type: Number, min: 0, max: 6, default: 0 },
  exercise: { type: Number, min: 0, max: 4, default: 0 },
  focusTime: { type: Number, min: 0, max: 8, default: 0 },
  breaks: { type: Number, min: 0, max: 20, default: 0 },
  socialTime: { type: Number, min: 0, max: 8, default: 0 },
  
  // Subjective Ratings
  mood: { type: Number, min: 1, max: 10, default: 5 },
  energy: { type: Number, min: 1, max: 10, default: 5 },
  productivity: { type: Number, min: 1, max: 10, default: 5 },
  stress: { type: Number, min: 1, max: 10, default: 5 },
  
  // Additional Information
  notes: String,
  
  // Metadata
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Index for efficient queries
behaviorSchema.index({ userId: 1, date: 1 });

// Pre-save middleware
behaviorSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model("Behavior", behaviorSchema); 