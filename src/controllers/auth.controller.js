import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccesToken } from "../libs/jwt.js";
import { authRequired } from "../middlewares/validateToken.js"
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import { uploadFile } from '../util/uploadFile.js'; // Asegúrate de importar la función para cargar archivos


export let tokensito = "";

export const register = async (req, res) => {
  const { username, phone, identificationNumber, role, programs, email, password} = req.body;
  
  try {
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json(["El correo ya esta en uso"]);
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      phone,
      identificationNumber,
      role,
      programs,
      email,
      password: passwordHash, 
    });
    const userSaved = await newUser.save();
    
    //const token = await createAccesToken({ id: userSaved._id });
    //res.cookie("token", token);
    
    res.json({
      Message: "Usuario creado satisfactoriamente",
      id: userSaved._id,
      username: userSaved.username,
      phone: userSaved.phone,
      identificationNumber: userSaved.identificationNumber,
      role: userSaved.role,
      programs: userSaved.programs,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updateAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ Message: error.Message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Excluye la contraseña en la respuesta
    res.json(users);
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ Message: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    return res.status(404).json({ message: "usuario no encontrado" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ Message: "Usuario no encontrado" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound)
      return res.status(400).json({
        message: ["El correo no existe"],
      });

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) {
      return res.status(400).json({
        message: ["La contraseña es incorrecta"],
      });
    }

    const token = await createAccesToken({ id: userFound._id });
    //res.cookie("token", token);
    tokensito=token;

    res.json({
      Message: "Usuario encontrado ",
      id: userFound._id,
      username: userFound.username,
      phone: userFound.phone,
      identificationNumber: userFound.identificationNumber,
      role: userFound.role,
      programs: userFound.programs,
      email: userFound.email,
      token: token,
      createdAt: userFound.createdAt,
      updateAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ Message: error.Message });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound)
    return res.status(400).json({ Message: "Usuario no encontrado" });

  return res.json({
    id: userFound._id,
    username: userFound.username,
    phone: userFound.phone,
    identificationNumber: userFound.identificationNumber,
    role: userFound.role,
    programs: userFound.programs,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updateAt: userFound.updateAt,
  });
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "No autorizado" });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "No autorizado" });

    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: "No autorizado" });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      phone: userFound.phone,
      identificationNumber: userFound.identificationNumber,
      role: userFound.role,
      programs: userFound.programs,
      email: userFound.email,
    });
  });
};

export const updateUser = async (req, res) => {
  try {
    const { password, ...updateData } = req.body;
    if (password) {
      const passwordHash = await bcrypt.hash(password, 10);
      updateData.password = passwordHash;
    }
    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ Message: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (error) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }
};