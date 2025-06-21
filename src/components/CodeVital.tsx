import React from 'react';

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
  return (
    <div className="space-y-8">
      {codeFragments.map((fragment, index) => (
        <div key={index} className={`code-fragment bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-yellow-400 transition-all duration-300 ${fragment.hoverClass}`}>
          <pre className="text-yellow-400 font-mono text-sm md:text-base overflow-x-auto">
            <code>{fragment.code}</code>
          </pre>
          <p className="text-gray-400 mt-3 text-sm italic">{fragment.meaning}</p>
        </div>
      ))}
    </div>
  );
};

export default CodeVital;