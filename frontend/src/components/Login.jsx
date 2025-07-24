import { useState } from "react";



const Login = ({ setShowRegister }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Inicio de sesión con:", formData);
    setIsLoggedIn(true);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-md w-96">
      {isLoggedIn ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-600">¡Bienvenido!</h2>
          <p className="mt-2 text-gray-700">Has iniciado sesión como <strong>{formData.email}</strong>.</p>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-center mb-4">Iniciar Sesión</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Correo Electrónico</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>

            <div>
              <label className="block text-gray-700">Contraseña</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Iniciar Sesión
            </button>
            <p
             onClick={() => navigate("/recuperar")}
             className="text-sm text-blue-600 hover:underline cursor-pointer text-center mt-2"
            >
            ¿Olvidaste tu contraseña?
            </p>
            <p className="text-center text-sm text-gray-600 mt-4">
              ¿No tienes cuenta?{" "}
              <button
                onClick={() => setShowRegister(true)}
                className="text-blue-600 hover:underline"
              >
                Regístrate
              </button>
            </p>
          </form>
        </>
      )}
    </div>
  </div>
);
};

export default Login;