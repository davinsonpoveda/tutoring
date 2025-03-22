const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth"); // Importa las rutas de login/register

require("dotenv").config();

const app = express();
app.use(express.json()); // Middleware para manejar JSON

// Conectar a MongoDB
mongoose
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((error) => console.error("❌ Error al conectar a MongoDB:", error));

// Rutas
app.use("/api/auth", authRoutes); // Usa las rutas de autenticación

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🌐 Servidor corriendo en http://localhost:${PORT}`));
