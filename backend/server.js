import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js"; // Importar rutas de usuario

dotenv.config(); // Cargar variables de entorno

console.log("🔍 MONGO_URI:", process.env.MONGO_URI); // Verificar si se carga la URI

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
// Rutas
app.use("/api/users", userRoutes); // Ruta para usuarios

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB conectado"))
  .catch((err) => console.log("❌ Error en MongoDB:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor en puerto ${PORT}`));

