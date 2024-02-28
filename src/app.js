import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import taskRoutes from "./routes/tasks.routes.js";
import coursesRoutes from "./routes/courses.routes.js";
import calificationsRoutes from "./routes/califications.routes.js";
import cors from "cors";
import { upload } from "./multer.js";
import { user } from "./models/user.js";
import { uploadFile } from './util/uploadFile.js'
import Task from "./models/task.model.js";

const app = express();
app.use(cookieParser());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());


app.use("/api", authRoutes);
app.use("/api", coursesRoutes);
app.use("/api", taskRoutes);
app.use("/api", calificationsRoutes);


app.post(
  "/api/create-user",
  upload.fields([{ name: "image", maxCount: 1 }]),
  async (req, res) => {
    const body = req.body;
    const image = req.files.image;

    if (image && image.length > 0) {
      const {downloadURL} = await uploadFile(image[0]);

      const newUser = await new user({
        userIdImage: body.userIdImage,
        image: downloadURL,
      }).save();

      return res.status(200).json({newUser})
    }

    return res.status(400).json({ message: "Debes enviar una imagen" });
  }
);

app.get("/api/users", async (req, res) => {
  try {
    const users = await user.find().sort({createdAt: -1})
    res.status(200).json({ users })
  } catch (error) {
    res.status(400).json({ message: 'ocurrio un error', error })
  }
});

app.get("/api/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const foundUser = await user.findById(userId);
    if (foundUser) {
      return res.status(200).json({ user: foundUser });
    } else {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    return res.status(400).json({ message: 'Ocurrió un error al buscar el usuario', error });
  }
});

app.delete("/api/deleteUsers/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await user.findByIdAndDelete(userId);
    if (deletedUser) {
      return res.status(200).json({ message: "Usuario eliminado correctamente" });
    } else {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    return res.status(400).json({ message: 'Ocurrió un error al eliminar el usuario', error });
  }
});

app.put("/api/updateUsers/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { userIdImage, image } = req.body;

    console.log("User ID:", userId);
    console.log("New userIdImage:", userIdImage);
    console.log("New image:", image);

    // Verificar si el usuario existe
    const existingUser = await user.findById(userId);
    if (!existingUser) {
      console.log("Usuario no encontrado");
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Actualizar los campos del usuario
    existingUser.userIdImage = userIdImage;
    existingUser.image = image;

    // Guardar los cambios en la base de datos
    const updatedUser = await existingUser.save();

    // Devolver el usuario actualizado
    console.log("Usuario actualizado:", updatedUser);
    res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    res.status(400).json({ message: 'Ocurrió un error al actualizar el usuario', error });
  }
});


/** 
// Obtener todas las tareas
app.get("/api/obtenerTasks", async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    console.log("tareas? ",req.user.id)
    res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Crear una nueva tarea
app.post("/api/creartasks", async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const newTask = new Task({
      title,
      description,
      date,
      user: req.user.id,
    });
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal" });
  }
});

// Obtener una tarea específica por ID
app.get("/api/task/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("user");
    if (!task) return res.status(404).json({ message: "Tarea no encontrada" });
    res.json(task);
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal" });
  }
});

// Eliminar una tarea por ID
app.delete("/api/eliminartasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Tarea no encontrada" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal" });
  }
});

// Actualizar una tarea por ID
app.put("/api/actualizartasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) return res.status(404).json({ message: "Tarea no encontrada" });
    res.json(task);
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal" });
  }
  
})*/;

export default app;
