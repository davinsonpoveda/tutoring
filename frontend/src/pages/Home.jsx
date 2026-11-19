import { useState } from "react";
import Header from "../components/Header";
import Features from "../components/Features";
import Login from "../components/Login";
import Register from "../components/Register";


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
   {/* Contenedor del Tutor IA Flotante */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-center gap-2">
        
        {/* Burbuja de diálogo animada */}
        <div className="bg-white text-green-800 px-4 py-2 rounded-2xl shadow-lg border border-green-200 text-sm font-bold animate-bounce relative">
          ¡Soy tu Tutor IA!
          {/* Pequeño triángulo de la burbuja hacia abajo */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-t-[8px] border-t-white border-r-[6px] border-r-transparent"></div>
        </div>

        {/* Botón que redirige a Open WebUI */}
      {/* Botón que redirige a Open WebUI */}
        <a 
          href="http://localhost:3000" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-20 h-20 flex justify-center items-center hover:scale-110 transition-transform drop-shadow-2xl z-50"
        >
          <img 
            src="/aguacate_chatbot_baile_1.gif" 
            alt="Tutor IA" 
            className="w-full h-full object-contain" 
          />
        </a>
      </div>
    </div>
  );
};

export default Home;









