import { useState } from "react";
import Header from "../components/Header";
import Features from "../components/Features";
import Login from "../components/Login";
import Register from "../components/Register";
import AvobotChat from "../components/AvobotChat";


const Home = () => {
  const [showRegister, setShowRegister] = useState(false);
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      {/* Encabezado */}
           <Header />
      {/* Sección de Características */}
           <Features />

      {/* Sección de Login o Registro */}
      {showRegister ? (
        <Register setShowRegister={setShowRegister} />
      ) : (
        <Login setShowRegister={setShowRegister} />
      )}
      {/* Tutor IA flotante: Open WebUI incrustado */}
      <AvobotChat />
    </div>
  );
};

export default Home;
