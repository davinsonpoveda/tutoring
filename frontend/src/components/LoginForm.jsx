import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Importa useNavigate
import { loginUser } from "../api";



const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate(); // ✅ Inicializa useNavigate
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      alert("Inicio de sesión exitoso");
      console.log("Usuario autenticado:", response);
      navigate("/"); // ✅ Redirige a la home después de iniciar sesión    
      } catch (error) {
      console.error("Error en el inicio de sesión:", error.response.data);
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input type="email" name="email" placeholder="Correo" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
        <button type="submit" className="bg-blue-600 text-white p-2">Ingresar</button>
      </form>
    </div>
  );
};

export default LoginForm;







