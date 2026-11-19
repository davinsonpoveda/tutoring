import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js"; // Importar rutas de usuario

dotenv.config(); // Cargar variables de entorno

for (const key of ["MONGO_URI", "JWT_SECRET"]) {
  if (!process.env[key]) {
    console.error(`❌ Falta la variable de entorno ${key} (ver backend/.env.example)`);
    process.exit(1);
  }
}

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

