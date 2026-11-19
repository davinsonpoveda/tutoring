import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// Marco común de las páginas internas: cabecera azul + botón para volver al inicio
const PageShell = ({ title, subtitle, children }) => (
  <div className="min-h-screen bg-gray-100">
    <header className="bg-blue-900 text-white py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-blue-200 hover:text-white mb-3"
        >
          <ArrowLeft size={16} /> Volver al inicio
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
        {subtitle && <p className="mt-2 text-blue-100">{subtitle}</p>}
      </div>
    </header>
    <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
  </div>
);

export default PageShell;
