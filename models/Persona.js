import mongoose from "mongoose";

const personaSchema = new mongoose.Schema({
  // Personal Information
  name: { type: String, required: true },
  email: String,
  age: String,
  occupation: String,
  
  // Productivity Profile
  productivityType: { type: String, required: true },
  workStyle: String,
  workHours: String,
  preferredWorkTime: String,
  
  // Goals & Objectives
  shortTermGoals: String,
  longTermGoals: String,
  primaryFocus: String,
  
  // Tools & Technology
  tools: [String],
  devices: [String],
  communicationTools: [String],
  
  // Habits & Preferences
  sleepSchedule: String,
  exerciseFrequency: String,
  screenTimePreference: String,
  breakPreference: String,
  
  // Challenges & Pain Points
  currentChallenges: String,
  desiredImprovements: String,
  
  // Privacy & Preferences
  dataSharing: { type: String, default: "minimal" },
  notificationPreferences: { type: String, default: "smart" },
  themePreference: { type: String, default: "auto" },
  
  // Metadata
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

personaSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model("Persona", personaSchema);
