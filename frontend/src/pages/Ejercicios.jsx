import { useMemo, useState } from "react";
import { FileText, Search, Download, X } from "lucide-react";
import PageShell from "../components/PageShell";

const SUBJECTS = {
  Matemáticas: { chip: "bg-blue-100 text-blue-700", icon: "text-blue-600", bar: "bg-blue-500" },
  Cálculo: { chip: "bg-green-100 text-green-700", icon: "text-green-600", bar: "bg-green-500" },
  "Ing. Eléctrica": { chip: "bg-yellow-100 text-yellow-800", icon: "text-yellow-600", bar: "bg-yellow-500" },
};

// Documentos de ejemplo (PoC): aún no hay archivos reales ni backend de documentos
const DOCS = [
  { id: 1, title: "Álgebra lineal: sistemas de ecuaciones", subject: "Matemáticas", type: "Guía", pages: 12, level: "Básico" },
  { id: 2, title: "Trigonometría: identidades y ejercicios", subject: "Matemáticas", type: "Hoja de ejercicios", pages: 8, level: "Básico" },
  { id: 3, title: "Probabilidad y estadística aplicada", subject: "Matemáticas", type: "Guía", pages: 15, level: "Intermedio" },
  { id: 4, title: "Límites y continuidad", subject: "Cálculo", type: "Hoja de ejercicios", pages: 10, level: "Básico" },
  { id: 5, title: "Derivadas: reglas y aplicaciones", subject: "Cálculo", type: "Guía", pages: 18, level: "Intermedio" },
  { id: 6, title: "Integrales definidas e impropias", subject: "Cálculo", type: "Formulario", pages: 4, level: "Avanzado" },
  { id: 7, title: "Ley de Ohm y circuitos en serie/paralelo", subject: "Ing. Eléctrica", type: "Hoja de ejercicios", pages: 9, level: "Básico" },
  { id: 8, title: "Análisis de mallas y nodos", subject: "Ing. Eléctrica", type: "Guía", pages: 14, level: "Intermedio" },
  { id: 9, title: "Circuitos RLC en corriente alterna", subject: "Ing. Eléctrica", type: "Formulario", pages: 6, level: "Avanzado" },
];

const Preview = ({ doc, onClose }) => (
  <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
      <div className="flex justify-between items-start">
        <div>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${SUBJECTS[doc.subject].chip}`}>{doc.subject}</span>
          <h3 className="font-bold text-lg mt-2">{doc.title}</h3>
          <p className="text-sm text-gray-500">{doc.type} · {doc.pages} páginas · {doc.level}</p>
        </div>
        <button onClick={onClose} aria-label="Cerrar" className="text-gray-400 hover:text-gray-700">
          <X size={20} />
        </button>
      </div>
      <div className="mt-4 border rounded-lg p-4 bg-gray-50 space-y-2">
        <div className={`h-3 w-2/3 rounded ${SUBJECTS[doc.subject].bar}`} />
        {[100, 90, 95, 70, 85, 60].map((w, i) => (
          <div key={i} className="h-2 bg-gray-200 rounded" style={{ width: `${w}%` }} />
        ))}
      </div>
      <button
        disabled
        className="mt-4 w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-200 text-gray-500 cursor-not-allowed"
      >
        <Download size={16} /> Descarga disponible próximamente
      </button>
    </div>
  </div>
);

const Ejercicios = () => {
  const [subject, setSubject] = useState("Todas");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  const docs = useMemo(
    () =>
      DOCS.filter(
        (d) =>
          (subject === "Todas" || d.subject === subject) &&
          d.title.toLowerCase().includes(query.trim().toLowerCase())
      ),
    [subject, query]
  );

  return (
    <PageShell
      title="Repositorio de Ejercicios"
      subtitle="Guías, hojas de ejercicios y formularios compartidos por tus tutores."
    >
      <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {["Todas", ...Object.keys(SUBJECTS)].map((s) => (
            <button
              key={s}
              onClick={() => setSubject(s)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${
                subject === s ? "bg-blue-900 text-white" : "bg-white text-gray-700 hover:bg-blue-50 border"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar documento…"
            className="pl-9 pr-3 py-2 border rounded-full text-sm w-full md:w-64"
          />
        </div>
      </div>

      {docs.length === 0 ? (
        <p className="text-center text-gray-500 mt-12">No hay documentos que coincidan con tu búsqueda.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          {docs.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelected(d)}
              className="h-full text-left bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition"
            >
              <div className={`h-1.5 ${SUBJECTS[d.subject].bar}`} />
              <div className="p-4">
                <FileText size={28} className={SUBJECTS[d.subject].icon} />
                <h3 className="font-bold mt-2 leading-snug">{d.title}</h3>
                <div className="flex items-center gap-2 mt-3 text-xs">
                  <span className={`px-2 py-0.5 rounded-full font-semibold ${SUBJECTS[d.subject].chip}`}>{d.subject}</span>
                  <span className="text-gray-500">{d.type} · {d.pages} págs.</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">Nivel {d.level}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {selected && <Preview doc={selected} onClose={() => setSelected(null)} />}
    </PageShell>
  );
};

export default Ejercicios;
