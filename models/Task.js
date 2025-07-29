import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  priority: { 
    type: String, 
    enum: ['low', 'medium', 'high'], 
    default: 'medium' 
  },
  status: { 
    type: String, 
    enum: ['pending', 'in-progress', 'completed'], 
    default: 'pending' 
  },
  done: { type: Boolean, default: false },
  dueDate: Date,
  estimatedTime: Number, // in minutes
  actualTime: Number, // in minutes
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  completedAt: Date
});

taskSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  if (this.done && !this.completedAt) {
    this.completedAt = new Date();
  }
  next();
});

export default mongoose.model("Task", taskSchema);
