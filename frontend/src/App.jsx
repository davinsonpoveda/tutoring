import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginForm from "./components/LoginForm";
import Register from "./components/Register";
import ClasesPersonalizadas from "./pages/ClasesPersonalizadas";
import Ejercicios from "./pages/Ejercicios";
import Horarios from "./pages/Horarios";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/clases-personalizadas" element={<ClasesPersonalizadas />} />
        <Route path="/ejercicios" element={<Ejercicios />} />
        <Route path="/horarios" element={<Horarios />} />
      </Routes>
    </Router>
  );
}

export default App;

/*function App() {
  return (
    <div className="font-sans">
      <Home />
    </div>
  );
}

export default App;*/
