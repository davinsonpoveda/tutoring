import { useState } from "react";
import { ChevronLeft, ChevronRight, CheckCircle2, Trash2 } from "lucide-react";
import PageShell from "../components/PageShell";

const MONTHS = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const WEEKDAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const HOURS = [8, 9, 10, 11, 14, 15, 16, 17, 18];
const SUBJECTS = ["Matemáticas", "Cálculo", "Ingeniería Eléctrica"];
const STORAGE_KEY = "avobot_reservas";

const dateKey = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const hourLabel = (h) => `${String(h).padStart(2, "0")}:00`;

// Horas ocupadas "simuladas" (PoC): determinista por fecha y hora, sin backend de agenda
const isTakenMock = (key, hour) =>
  [...`${key}-${hour}`].reduce((a, c) => a + c.charCodeAt(0), 0) % 4 === 0;

const loadReservas = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
};

const Horarios = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [day, setDay] = useState(null); // Date
  const [hour, setHour] = useState(null);
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [reservas, setReservas] = useState(loadReservas);
  const [confirmed, setConfirmed] = useState(null);

  const persist = (list) => {
    setReservas(list);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {
      /* sin almacenamiento: la reserva solo vive en esta sesión */
    }
  };

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const offset = (new Date(year, month, 1).getDay() + 6) % 7; // semana inicia en lunes
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [...Array(offset).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1))];

  const isDisabled = (d) => d < today || d.getDay() === 0; // pasado o domingo
  const isBooked = (key, h) => reservas.some((r) => r.date === key && r.hour === h);
  const canGoBack = new Date(year, month - 1, 1) >= new Date(today.getFullYear(), today.getMonth(), 1);

  const selectDay = (d) => {
    setDay(d);
    setHour(null);
    setConfirmed(null);
  };

  const confirm = () => {
    const reserva = { id: Date.now(), date: dateKey(day), hour, subject };
    persist([...reservas, reserva]);
    setConfirmed(reserva);
    setHour(null);
  };

  const cancel = (id) => persist(reservas.filter((r) => r.id !== id));

  const sorted = [...reservas].sort((a, b) => (a.date + a.hour).localeCompare(b.date + b.hour));

  return (
    <PageShell
      title="Horarios Flexibles"
      subtitle="Elige el día y la hora que mejor te quede y reserva tu clase en el calendario."
    >
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Calendario */}
        <section className="lg:col-span-3 bg-white rounded-xl shadow-md p-5">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setCursor(new Date(year, month - 1, 1))}
              disabled={!canGoBack}
              aria-label="Mes anterior"
              className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
            </button>
            <h2 className="font-bold text-lg">{MONTHS[month]} {year}</h2>
            <button
              onClick={() => setCursor(new Date(year, month + 1, 1))}
              aria-label="Mes siguiente"
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-7 text-center text-xs font-semibold text-gray-500 mb-1">
            {WEEKDAYS.map((w) => <div key={w} className="py-1">{w}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((d, i) =>
              d === null ? (
                <div key={`e${i}`} />
              ) : (
                <button
                  key={dateKey(d)}
                  onClick={() => selectDay(d)}
                  disabled={isDisabled(d)}
                  className={`aspect-square rounded-lg text-sm font-semibold transition ${
                    day && dateKey(day) === dateKey(d)
                      ? "bg-blue-900 text-white"
                      : dateKey(d) === dateKey(today)
                      ? "border-2 border-yellow-400 hover:bg-yellow-50"
                      : "hover:bg-blue-50"
                  } disabled:text-gray-300 disabled:hover:bg-transparent disabled:cursor-not-allowed`}
                >
                  {d.getDate()}
                </button>
              )
            )}
          </div>
          <p className="text-xs text-gray-400 mt-3">Atendemos de lunes a sábado. Domingos y fechas pasadas no están disponibles.</p>
        </section>

        {/* Horas y confirmación */}
        <section className="lg:col-span-2 bg-white rounded-xl shadow-md p-5">
          {!day ? (
            <p className="text-gray-500 text-sm">Selecciona un día del calendario para ver las horas disponibles.</p>
          ) : (
            <>
              <h2 className="font-bold">
                {day.getDate()} de {MONTHS[day.getMonth()]}
              </h2>
              <div className="grid grid-cols-3 gap-2 mt-3">
                {HOURS.map((h) => {
                  const taken = isTakenMock(dateKey(day), h) || isBooked(dateKey(day), h);
                  return (
                    <button
                      key={h}
                      disabled={taken}
                      onClick={() => { setHour(h); setConfirmed(null); }}
                      className={`py-2 rounded-lg text-sm font-semibold border transition ${
                        hour === h ? "bg-yellow-400 border-yellow-400" : "hover:bg-yellow-50"
                      } disabled:bg-gray-100 disabled:text-gray-300 disabled:line-through disabled:cursor-not-allowed`}
                    >
                      {hourLabel(h)}
                    </button>
                  );
                })}
              </div>

              <label className="block text-sm text-gray-700 mt-4">
                Materia
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-lg"
                >
                  {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </label>

              <button
                onClick={confirm}
                disabled={hour === null}
                className="mt-4 w-full py-2 rounded-lg bg-blue-900 text-white font-semibold hover:bg-blue-800 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Confirmar reserva
              </button>
            </>
          )}

          {confirmed && (
            <div className="mt-4 flex items-start gap-2 bg-green-50 border border-green-200 text-green-800 rounded-lg p-3 text-sm">
              <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
              <span>
                ¡Reserva confirmada! {confirmed.subject} el {confirmed.date} a las {hourLabel(confirmed.hour)}.
              </span>
            </div>
          )}
        </section>
      </div>

      {/* Mis reservas */}
      <section className="mt-8">
        <h2 className="text-lg font-bold text-gray-800">Mis reservas</h2>
        {sorted.length === 0 ? (
          <p className="text-gray-500 text-sm mt-2">Aún no tienes clases reservadas.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {sorted.map((r) => (
              <li key={r.id} className="bg-white rounded-lg shadow-sm px-4 py-3 flex items-center justify-between">
                <span className="text-sm">
                  <strong>{r.subject}</strong> · {r.date} · {hourLabel(r.hour)}
                </span>
                <button onClick={() => cancel(r.id)} aria-label="Cancelar reserva" className="text-gray-400 hover:text-red-600">
                  <Trash2 size={18} />
                </button>
              </li>
            ))}
          </ul>
        )}
        <p className="text-xs text-gray-400 mt-3">
          PoC: las reservas se guardan solo en este navegador; aún no hay agenda en el servidor.
        </p>
      </section>
    </PageShell>
  );
};

export default Horarios;
