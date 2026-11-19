import { Link } from "react-router-dom";
import { BookOpen, ClipboardList, CalendarCheck } from "lucide-react";

const features = [
  {
    to: "/clases-personalizadas",
    Icon: BookOpen,
    title: "Clases Personalizadas",
    text: "Refuerza tus conocimientos con sesiones individuales.",
    bg: "bg-blue-100",
    color: "text-blue-600",
  },
  {
    to: "/ejercicios",
    Icon: ClipboardList,
    title: "Ejercicios Prácticos",
    text: "Aprende con ejemplos aplicados a tu área de estudio.",
    bg: "bg-green-100",
    color: "text-green-600",
  },
  {
    to: "/horarios",
    Icon: CalendarCheck,
    title: "Horarios Flexibles",
    text: "Reserva según tu disponibilidad.",
    bg: "bg-yellow-100",
    color: "text-yellow-600",
  },
];

const Features = () => {
  return (
    <div className="flex flex-wrap justify-center gap-6 my-8 px-4">
      {features.map(({ to, Icon, title, text, bg, color }) => (
        <Link
          key={to}
          to={to}
          className="bg-white p-4 rounded-lg shadow-md text-center w-60 hover:shadow-xl hover:-translate-y-1 transition"
        >
          <div className={`${bg} p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto`}>
            <Icon className={color} size={32} />
          </div>
          <h3 className="font-bold text-lg mt-2">{title}</h3>
          <p className="text-gray-600 text-sm">{text}</p>
        </Link>
      ))}
    </div>
  );
};

export default Features;
