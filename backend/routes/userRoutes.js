import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";  // <---- Importar bcrypt

const router = express.Router();


// Ruta para registrar un usuario
router.post("/register", async (req, res) => {
  console.log("📩 Datos recibidos:", req.body);
  const { name, email, password, role } = req.body;

  // Verificar si el usuario ya existe
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "El usuario ya existe" });
  }
  try {
    // 🔐 Encriptar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo usuario con contraseña encriptada
    const user = await User.create({ name, email, password: hashedPassword, role });

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

export default router;
// Ruta para obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // 👈 Excluimos el campo password
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los usuarios" });
  }
});