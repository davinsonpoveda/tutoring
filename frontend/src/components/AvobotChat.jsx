import { useState } from "react";
import { X, ExternalLink } from "lucide-react";

// URL de Open WebUI (configurable con VITE_OPENWEBUI_URL en frontend/.env)
const CHAT_URL = import.meta.env.VITE_OPENWEBUI_URL || "http://localhost:3000";

// Tutor IA flotante: el aguacate abre un panel con Open WebUI incrustado (iframe)
const AvobotChat = () => {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false); // el iframe se carga la primera vez que se abre

  const toggle = () => {
    setOpen((o) => !o);
    setLoaded(true);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-2">
      {/* Panel de chat: se mantiene montado tras abrirlo para no perder la conversación */}
      {loaded && (
        <div
          className={`${open ? "flex" : "hidden"} flex-col w-[min(380px,calc(100vw-2rem))] h-[min(560px,calc(100vh-10rem))] bg-white rounded-2xl shadow-2xl border border-green-200 overflow-hidden`}
        >
          <div className="flex items-center justify-between bg-green-700 text-white px-4 py-2">
            <span className="font-bold">Avobot</span>
            <div className="flex items-center gap-3">
              <a
                href={CHAT_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir en una pestaña nueva"
                title="Abrir en una pestaña nueva"
                className="hover:text-green-200"
              >
                <ExternalLink size={16} />
              </a>
              <button onClick={toggle} aria-label="Cerrar chat" className="hover:text-green-200">
                <X size={18} />
              </button>
            </div>
          </div>
          <iframe title="Avobot" src={CHAT_URL} className="flex-1 w-full border-0" />
        </div>
      )}

      <div className="flex flex-col items-center gap-2">
        {/* Burbuja de diálogo animada (se oculta con el chat abierto) */}
        {!open && (
          <div className="bg-white text-green-800 px-4 py-2 rounded-2xl shadow-lg border border-green-200 text-sm font-bold animate-bounce relative">
            ¡Soy tu Tutor IA!
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-t-[8px] border-t-white border-r-[6px] border-r-transparent"></div>
          </div>
        )}

        <button
          onClick={toggle}
          aria-label={open ? "Cerrar chat de Avobot" : "Abrir chat de Avobot"}
          aria-expanded={open}
          className="w-20 h-20 flex justify-center items-center hover:scale-110 transition-transform drop-shadow-2xl"
        >
          <img src="/aguacate_chatbot_baile_1.gif" alt="Tutor IA" className="w-full h-full object-contain" />
        </button>
      </div>
    </div>
  );
};

export default AvobotChat;
