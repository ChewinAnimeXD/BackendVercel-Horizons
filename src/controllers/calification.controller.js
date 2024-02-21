import Calification from "../models/calification.model.js";

export const getCalifications = async (req, res) => {
  try {
    const califications = await Calification.find();
    res.json(califications);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const createCalification = async (req, res) => {
  try {
    const { idstudent, course, name, calification, comment } = req.body;
    const newCalification = new Calification({
      name,
      course,
      calification,
      comment,
      user: idstudent || req.user.id,
    });
    const savedCalification = await newCalification.save();
    res.json(savedCalification);
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal" });
  }
};



export const getCalification = async (req, res) => {
  
  try {
    const calification = await Calification.findById(req.params.id);
    if (!calification) return res.status(404).json({ Message: "Curso no encontrado" });
    res.json(calification);
  } catch (error) {
    return res.status(404).json({ message: "Curso no encontrado" });
  }
};

export const deleteCalification = async (req, res) => {
  try {
    const calification = await Calification.findByIdAndDelete(req.params.id);
    if (!calification) return res.status(404).json({ Message: "Curso no encontrado" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Curso no encontrado" });
  }
};

export const updateCalification = async (req, res) => {
  try {
    const calification = await Calification.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!calification) return res.status(404).json({ Message: "Curso no encontrado" });
    res.json(calification);
  } catch (error) {
    return res.status(404).json({ message: "Curso no encontrado" });
  }
};


