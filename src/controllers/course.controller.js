import Course from "../models/course.model.js";

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createCourse = async (req, res) => {
  try {
    const { name, idstudent, teacher, students} = req.body;
    const newCourse = new Course({
      name,
      idstudent,
      teacher,
      students,
      user: req.user.id,
    });
    const savedCourse = await newCourse.save();
    res.json(savedCourse);
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal al crear el curso" });
  }
};

export const getCourse = async (req, res) => {
  
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ Message: "Curso no encontrado" });
    res.json(course);
  } catch (error) {
    return res.status(404).json({ message: "Curso no encontrado" });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ Message: "Curso no encontrado" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Curso no encontrado" });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!course) return res.status(404).json({ Message: "Curso no encontrado" });
    res.json(course);
  } catch (error) {
    return res.status(404).json({ message: "Curso no encontrado" });
  }
};

export const deleteStudentFromCourse = async (req, res) => {
  
  try {
    const { courseId, studentId } = req.params;
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Curso no encontrado" });

    course.students.pull(studentId);
    await course.save();

    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al eliminar estudiante del curso" });
  }
};
