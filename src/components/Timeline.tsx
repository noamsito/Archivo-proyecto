import React from 'react';
import { CloudRainWind, BookA, PersonStanding, Star, Sunrise } from 'lucide-react';

const timelineData = [
  {
    year: '2013',
    title: 'Primera Comunión',
    description: 'Recibido como regalo de mi padre. Primera vez que lo sostuve en mis manos pequeñas.',
    icon: Star
  },
  {
    year: '2014',
    title: 'Adolescencia sin fe',
    description: 'En los momentos de duda y rebeldía, siempre estaba ahí, en mi velador, como un recordatorio de lo que la fe significaba para mí.',
    icon: PersonStanding
  },
  {
    year: '2018',
    title: 'Muerte de mi abuelo',
    description: 'Testigo de las penas pasadas tras la muerte de mi abuelo. Un símbolo de consuelo en tiempos difíciles.',
    icon: CloudRainWind
  },
  {
    year: '2022',
    title: 'Universidad',
    description: 'Antes de poder entrar en la carrera que soñaba, el crucifijo se convirtió en un símbolo de perseverancia y esperanza.',
    icon: BookA
  },
  {
    year: '2024',
    title: 'Código Abierto',
    description: 'Hoy se transforma en este archivo digital. Su presencia ahora es código.',
    icon: Sunrise
  }
];

const Timeline: React.FC = () => {
  return (
    <div className="space-y-12">
      {timelineData.map((item, index) => (
        <div key={index} className="flex items-start space-x-6 group">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-yellow-400 bg-opacity-20 rounded-full flex items-center justify-center group-hover:bg-opacity-40 transition-all duration-300">
              <item.icon className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
          <div className="flex-grow">
            <div className="flex items-center space-x-4 mb-2">
              <span className="text-2xl font-serif text-yellow-400 font-bold">{item.year}</span>
              <h3 className="text-xl font-serif text-white">{item.title}</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;