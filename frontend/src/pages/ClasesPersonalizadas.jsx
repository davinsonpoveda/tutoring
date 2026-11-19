import { Link } from "react-router-dom";
import { Video, FileText, TrendingUp, Target, Clock, Users } from "lucide-react";
import PageShell from "../components/PageShell";

const highlights = [
  { Icon: Target, title: "Plan a tu medida", text: "Diagnóstico inicial y objetivos según tu materia y tu nivel." },
  { Icon: Users, title: "Uno a uno", text: "Sesiones individuales con un tutor, sin grupos ni distracciones." },
  { Icon: Clock, title: "60 minutos", text: "Clases de una hora, en línea y en el horario que elijas." },
];

// ---- "Pantallazos" ilustrativos (maquetas dibujadas con CSS) ----

const Frame = ({ label, children }) => (
  <figure className="bg-white rounded-xl shadow-md overflow-hidden">
    <div className="flex items-center gap-1.5 bg-gray-200 px-3 py-2">
      <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
      <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
    </div>
    <div className="h-44 p-3 bg-gray-50">{children}</div>
    <figcaption className="p-4 text-sm text-gray-700">{label}</figcaption>
  </figure>
);

const MockVideoClass = () => (
  <div className="h-full grid grid-cols-3 gap-2">
    <div className="col-span-2 bg-white border rounded p-2 flex flex-col justify-center font-mono text-blue-900 text-sm">
      <p>∫ x² dx = x³/3 + C</p>
      <p className="mt-1">V = I · R</p>
      <p className="mt-1 text-green-600">✔ Resuelto paso a paso</p>
    </div>
    <div className="flex flex-col gap-2">
      <div className="flex-1 rounded bg-blue-200 flex items-center justify-center text-blue-800 text-xs font-bold">Tutor</div>
      <div className="flex-1 rounded bg-yellow-200 flex items-center justify-center text-yellow-800 text-xs font-bold">Tú</div>
    </div>
  </div>
);

const MockExercises = () => (
  <div className="h-full space-y-2">
    {["Límites y continuidad", "Circuitos en serie", "Sistemas de ecuaciones"].map((t, i) => (
      <div key={t} className="flex items-center gap-2 bg-white border rounded px-2 py-1.5 text-xs">
        <FileText size={14} className="text-green-600" />
        <span className="flex-1">{t}</span>
        <span className={i === 0 ? "text-green-600 font-bold" : "text-gray-400"}>{i === 0 ? "Hecho" : "Pendiente"}</span>
      </div>
    ))}
    <div className="h-2 bg-gray-200 rounded"><div className="h-2 w-1/3 bg-green-500 rounded" /></div>
  </div>
);

const MockProgress = () => (
  <div className="h-full flex items-end gap-2 px-2">
    {[30, 45, 40, 62, 75, 88].map((h, i) => (
      <div key={i} className="flex-1 bg-blue-500 rounded-t" style={{ height: `${h}%` }} />
    ))}
  </div>
);

const ClasesPersonalizadas = () => (
  <PageShell
    title="Clases Personalizadas"
    subtitle="Sesiones individuales para reforzar Matemáticas, Cálculo e Ingeniería Eléctrica."
  >
    <section className="grid md:grid-cols-3 gap-4">
      {highlights.map(({ Icon, title, text }) => (
        <div key={title} className="bg-white rounded-xl shadow-md p-5">
          <Icon className="text-blue-600" size={28} />
          <h3 className="font-bold mt-2">{title}</h3>
          <p className="text-gray-600 text-sm mt-1">{text}</p>
        </div>
      ))}
    </section>

    <section className="mt-10">
      <h2 className="text-xl font-bold text-gray-800">Cómo son nuestras clases</h2>
      <p className="text-gray-600 text-sm mt-1">
        Vista previa ilustrativa de lo que verás durante tu acompañamiento.
      </p>
      <div className="grid md:grid-cols-3 gap-6 mt-4">
        <Frame label="1. Clase en vivo: el tutor resuelve contigo en una pizarra compartida.">
          <MockVideoClass />
        </Frame>
        <Frame label="2. Ejercicios dirigidos: práctica guiada con material de apoyo.">
          <MockExercises />
        </Frame>
        <Frame label="3. Seguimiento: ves tu avance clase a clase.">
          <MockProgress />
        </Frame>
      </div>
    </section>

    <section className="mt-10 bg-blue-900 text-white rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Video size={28} className="text-yellow-300" />
        <p className="font-semibold">¿Listo para tu primera sesión?</p>
      </div>
      <Link
        to="/horarios"
        className="px-5 py-2 bg-yellow-400 text-black rounded-full font-semibold hover:bg-yellow-300 transition"
      >
        Ver horarios disponibles
      </Link>
    </section>
  </PageShell>
);

export default ClasesPersonalizadas;
