// In-memory behavior controller (temporary until MongoDB is set up)

// Create new behavior entry
export const createBehavior = async (req, res) => {
  try {
    const behavior = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    global.behaviors.push(behavior);
    res.status(201).json(behavior);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all behaviors for a user
export const getBehaviors = async (req, res) => {
  try {
    const { userId } = req.params;
    const behaviors = global.behaviors
      .filter(b => b.userId === userId)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    res.json(behaviors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get behavior by ID
export const getBehavior = async (req, res) => {
  try {
    const behavior = global.behaviors.find(b => b.id === req.params.id);
    if (!behavior) {
      return res.status(404).json({ error: "Behavior not found" });
    }
    res.json(behavior);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update behavior
export const updateBehavior = async (req, res) => {
  try {
    const index = global.behaviors.findIndex(b => b.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: "Behavior not found" });
    }
    global.behaviors[index] = {
      ...global.behaviors[index],
      ...req.body,
      updatedAt: new Date()
    };
    res.json(global.behaviors[index]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete behavior
export const deleteBehavior = async (req, res) => {
  try {
    const index = global.behaviors.findIndex(b => b.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: "Behavior not found" });
    }
    global.behaviors.splice(index, 1);
    res.json({ message: "Behavior deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get analytics for a user
export const getAnalytics = async (req, res) => {
  try {
    const { userId } = req.params;
    const { days = 7 } = req.query;
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));
    
    const behaviors = global.behaviors
      .filter(b => b.userId === userId && new Date(b.date) >= startDate)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    
    if (behaviors.length === 0) {
      return res.json({
        message: "No data available for analysis",
        metrics: {},
        trends: {},
        recommendations: []
      });
    }
    
    // Calculate metrics
    const avg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
    
    const metrics = {
      avgProductivity: avg(behaviors.map(b => b.productivity)),
      avgSleep: avg(behaviors.map(b => b.sleep)),
      avgScreenTime: avg(behaviors.map(b => b.screenTime)),
      avgWorkHours: avg(behaviors.map(b => b.workHours)),
      avgMood: avg(behaviors.map(b => b.mood)),
      avgEnergy: avg(behaviors.map(b => b.energy || 5)),
      avgStress: avg(behaviors.map(b => b.stress || 5)),
      avgExercise: avg(behaviors.map(b => b.exercise || 0)),
      avgFocusTime: avg(behaviors.map(b => b.focusTime || 0)),
      avgSocialTime: avg(behaviors.map(b => b.socialTime || 0)),
      totalEntries: behaviors.length
    };
    
    // Calculate trends
    const recent = behaviors.slice(-3);
    const older = behaviors.slice(0, 3);
    
    const trends = {
      productivity: recent.length > 0 && older.length > 0 ? 
        avg(recent.map(b => b.productivity)) - avg(older.map(b => b.productivity)) : 0,
      mood: recent.length > 0 && older.length > 0 ? 
        avg(recent.map(b => b.mood)) - avg(older.map(b => b.mood)) : 0
    };
    
    // Generate recommendations
    const recommendations = [];
    if (metrics.avgSleep < 7) {
      recommendations.push("Consider improving sleep quality - aim for 7-9 hours");
    }
    if (metrics.avgScreenTime > 8) {
      recommendations.push("Screen time is high - try digital detox techniques");
    }
    if (metrics.avgExercise < 0.5) {
      recommendations.push("Exercise levels are low - try short daily workouts");
    }
    if (metrics.avgWorkHours > 9 && metrics.avgSocialTime < 1) {
      recommendations.push("Consider work-life balance - schedule social time");
    }
    
    res.json({
      metrics,
      trends,
      recommendations: recommendations.slice(0, 3)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 