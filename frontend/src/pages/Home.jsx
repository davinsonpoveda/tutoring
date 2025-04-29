import { useState } from "react";
import Header from "../components/Header";
import Features from "../components/Features";
import Login from "../components/Login";
import Register from "../components/Register";


const Home = () => {
  const [showRegister, setShowRegister] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
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
    </div>
  );
};

export default Home;








/*const Home = () => {
  return (
    <div>
      <Header />
      <Features />
      <LoginForm />
    </div>
  );
};

export default Home;*/
