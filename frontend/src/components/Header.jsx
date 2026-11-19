import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-900 text-white py-6 text-center">
      <h1 className="text-2xl md:text-3xl font-bold">
        Tutorías en Matemáticas, Cálculo e Ingeniería Eléctrica
      </h1>
      <p className="mt-2 text-sm md:text-base">
        Clases personalizadas y recursos exclusivos para mejorar tu rendimiento académico.
      </p>
      <Link
        to="/login"
        className="inline-block mt-4 px-4 py-2 bg-yellow-400 text-black rounded-full font-semibold hover:bg-yellow-300 transition"
      >
        Reserva una Clase
      </Link>
    </header>
  );
};

export default Header;
