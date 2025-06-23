import React from 'react';
import { useAudioManager } from './SoundManager';

const codeFragments = [
  {
    code: '<div class="proteccion">Fe constante</div>',
    meaning: 'Estructura invisible que sostiene',
    hoverClass: 'hover-protection'
  },
  {
    code: 'if (dolor > resistencia) { buscar(crucifijo); }',
    meaning: 'Lógica de supervivencia emocional',
    hoverClass: 'hover-pain'
  },
  {
    code: 'const recuerdos = padre.regalo.filter(item => item.permanece);',
    meaning: 'Herencia que trasciende el tiempo',
    hoverClass: 'hover-nostalgia'
  },
  {
    code: 'while (vida.continua) { object.persiste(); }',
    meaning: 'Loop infinito de permanencia',
    hoverClass: 'hover-loop'
  },
  {
    code: 'function transformar() { return fisica_to_digital(); }',
    meaning: 'Metamorfosis contemporánea',
    hoverClass: 'hover-transform'
  }
];

const CodeVital: React.FC = () => {
  const audioManager = useAudioManager();

  return (
    <div className="space-y-8">
      {codeFragments.map((fragment, index) => (
        <div 
          key={index} 
          className={`code-fragment p-6 rounded-lg transition-all duration-300 ${fragment.hoverClass}`}
          onMouseEnter={() => audioManager.playCodeHoverSound()}
        >
          <pre className="text-accent font-mono text-sm md:text-base overflow-x-auto">
            <code>{fragment.code}</code>
          </pre>
          <p className="text-secondary mt-3 text-sm italic">{fragment.meaning}</p>
        </div>
      ))}
    </div>
  );
};

export default CodeVital;