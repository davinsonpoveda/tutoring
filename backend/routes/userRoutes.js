import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";  // <---- Importar bcrypt
import { signToken, requireAuth } from "../middleware/auth.js";

const router = express.Router();


// Ruta para registrar un usuario
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  // Verificar si el usuario ya existe
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "El usuario ya existe" });
  }
  try {
    // La contraseña se encripta en el hook pre("save") del modelo User
    const user = await User.create({ name, email, password, role });

    // Enviar respuesta con los datos del usuario (sin contraseña)
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("❌ Error al registrar usuario:", error);
    res.status(500).json({ message: "Error al registrar el usuario" });
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar usuario por email
    const user = await User.findOne({ email });

   // ✅ Comparar la contraseña encriptada
   if (user && await bcrypt.compare(password, user.password)) {
    res.status(200).json({
      token: signToken(user),
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
    } else {
      res.status(401).json({ message: "Credenciales inválidas" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
});

// Ruta para obtener todos los usuarios (requiere token)
router.get("/", requireAuth, async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // 👈 Excluimos el campo password
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los usuarios" });
  }
});

export default router;
