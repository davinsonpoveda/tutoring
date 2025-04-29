import { useState } from "react";
import { registerUser } from "../api";

const Register = ({ setShowRegister }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "estudiante", // Valor por defecto
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      alert("Registro exitoso. Ahora inicia sesión.");
      console.log("Usuario registrado:", response);
    } catch (error) {
      console.error("Error en el registro:", error.response.data);
      alert("Error al registrarse.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold">Registro</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input type="text" name="name" placeholder="Nombre" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Correo" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
        <select name="role" onChange={handleChange}>
          <option value="estudiante">Estudiante</option>
          <option value="tutor">Tutor</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white p-2">Registrarse</button>
      </form>
      <p className="text-center text-sm text-gray-600 mt-4">
        ¿Ya tienes cuenta?{" "}
        <button
          onClick={() => setShowRegister(false)}
          className="text-blue-600 hover:underline"
        >
          Inicia sesión
        </button>
      </p>
    </div>
  );
};

export default Register;
