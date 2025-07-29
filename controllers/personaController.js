// In-memory persona controller (temporary until MongoDB is set up)

// Create new persona
export const createPersona = async (req, res) => {
  try {
    const persona = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    global.personas.push(persona);
    res.status(201).json(persona);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get persona by ID
export const getPersona = async (req, res) => {
  try {
    const persona = global.personas.find(p => p.id === req.params.id);
    if (!persona) {
      return res.status(404).json({ error: "Persona not found" });
    }
    res.json(persona);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get latest persona
export const getLatestPersona = async (req, res) => {
  try {
    const persona = global.personas[global.personas.length - 1];
    if (!persona) {
      return res.status(404).json({ error: "No persona found" });
    }
    res.json(persona);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update persona
export const updatePersona = async (req, res) => {
  try {
    const index = global.personas.findIndex(p => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: "Persona not found" });
    }
    global.personas[index] = {
      ...global.personas[index],
      ...req.body,
      updatedAt: new Date()
    };
    res.json(global.personas[index]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete persona
export const deletePersona = async (req, res) => {
  try {
    const index = global.personas.findIndex(p => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: "Persona not found" });
    }
    global.personas.splice(index, 1);
    res.json({ message: "Persona deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 