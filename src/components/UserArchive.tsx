import React from 'react';
import { ArrowLeft, Calendar, Heart } from 'lucide-react';
import TypingText from './TypingText';

interface UserArchiveProps {
  data: {
    objeto: string;
    historia: string;
    significado: string;
    timestamp: string;
  };
  onBack: () => void;
}

const UserArchive: React.FC<UserArchiveProps> = ({ data, onBack }) => {
  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="fixed top-8 left-8 z-50 flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Volver al archivo principal</span>
      </button>

      {/* Section 1: Intro - Archivo Personal Activado */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black opacity-50"></div>
        <div className="text-center z-10 px-4">
          <div className="mb-12">
            <div className="w-20 h-20 bg-yellow-400 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-8">
              <Heart className="w-10 h-10 text-yellow-400" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif mb-8 text-white">
            {data.objeto}
          </h1>
          <div className="text-xl md:text-2xl text-gray-300 mb-4">
            <TypingText 
              text="Un archivo personal activado." 
              delay={1000}
              speed={80}
            />
          </div>
          <div className="text-lg md:text-xl text-yellow-400">
            <TypingText 
              text={`Registrado el ${formatDate(data.timestamp)}`}
              delay={3000}
              speed={100}
            />
          </div>
        </div>
      </section>

      {/* Section 2: Historia */}
      <section className="min-h-screen flex items-center py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif text-yellow-400 mb-12 text-center">Historia</h2>
          <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
            <div className="flex items-center mb-6">
              <Calendar className="w-6 h-6 text-yellow-400 mr-3" />
              <span className="text-gray-400">Origen y contexto</span>
            </div>
            <p className="text-lg leading-relaxed text-gray-300">
              {data.historia}
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Significado */}
      <section className="min-h-screen flex items-center py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif text-yellow-400 mb-12 text-center">Permanencia</h2>
          <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
            <div className="flex items-center mb-6">
              <Heart className="w-6 h-6 text-yellow-400 mr-3" />
              <span className="text-gray-400">Razón de persistencia</span>
            </div>
            <p className="text-lg leading-relaxed text-gray-300">
              {data.significado}
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Código Personal */}
      <section className="min-h-screen flex items-center py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-serif text-yellow-400 mb-12">Código Personal</h2>
          <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
            <pre className="text-yellow-400 font-mono text-sm md:text-base">
              <code>
{`const objeto = {
  nombre: "${data.objeto}",
  tipo: "archivo_personal",
  estado: "persistente",
  valor: "inmensurable"
};

function mantenerVivo(recuerdo) {
  while (vida.continua) {
    recuerdo.preservar();
    memoria.actualizar(recuerdo);
  }
  return "permanencia_digital";
}`}
              </code>
            </pre>
          </div>
          
          <div className="mt-16 space-y-6">
            <p className="text-2xl md:text-3xl font-serif text-white leading-relaxed">
              Tu archivo ahora es parte del código colectivo.
            </p>
            <p className="text-xl md:text-2xl text-gray-300">
              Una permanencia compartida.
            </p>
            <p className="text-yellow-400 font-mono text-sm">
              // Archivo personal integrado al sistema.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserArchive;