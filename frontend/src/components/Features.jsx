import { BookOpen, ClipboardList, CalendarCheck } from "lucide-react";

const Features = () => {
  return (
    <div className="flex justify-center gap-6 my-8">
      <div className="bg-white p-4 rounded-lg shadow-md text-center w-60">
        <div className="bg-blue-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto">
          <BookOpen className="text-blue-600" size={32} />
        </div>
        <h3 className="font-bold text-lg mt-2">Clases Personalizadas</h3>
        <p className="text-gray-600 text-sm">Refuerza tus conocimientos con sesiones individuales.</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md text-center w-60">
        <div className="bg-green-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto">
          <ClipboardList className="text-green-600" size={32} />
        </div>
        <h3 className="font-bold text-lg mt-2">Ejercicios Prácticos</h3>
        <p className="text-gray-600 text-sm">Aprende con ejemplos aplicados a tu área de estudio.</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md text-center w-60">
        <div className="bg-yellow-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto">
          <CalendarCheck className="text-yellow-600" size={32} />
        </div>
        <h3 className="font-bold text-lg mt-2">Horarios Flexibles</h3>
        <p className="text-gray-600 text-sm">Reserva según tu disponibilidad.</p>
      </div>
    </div>
  );
};

export default Features;
