import React, { useEffect, useState } from 'react';
import FloatingCrucifix from './components/FloatingCrucifix';
import TypingText from './components/TypingText';
import Timeline from './components/Timeline';
import CodeVital from './components/CodeVital';
import CollaborativeForm from './components/CollaborativeForm';
import FinalTransformation from './components/FinalTransformation';
import UserArchive from './components/UserArchive';

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [showUserArchive, setShowUserArchive] = useState(false);
  const [userArchiveData, setUserArchiveData] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
          setCurrentSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleArchiveSubmission = (data) => {
    setUserArchiveData(data);
    setShowUserArchive(true);
  };

  const handleBackToMain = () => {
    setShowUserArchive(false);
    setUserArchiveData(null);
  };

  if (showUserArchive && userArchiveData) {
    return <UserArchive data={userArchiveData} onBack={handleBackToMain} />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Dots - Vertical */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col space-y-4">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <button
            key={index}
            onClick={() => {
              const section = document.querySelectorAll('section')[index];
              section?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`w-3 h-3 rounded-full border border-yellow-400 transition-all duration-300 ${
              currentSection === index ? 'bg-yellow-400' : 'bg-transparent'
            }`}
          />
        ))}
      </div>

      {/* Section 1: Intro - Archivo Activado */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black opacity-50"></div>
        <div className="text-center z-10 px-4">
          <FloatingCrucifix />
          <h1 className="text-4xl md:text-6xl font-serif mb-8 text-white">
            Crucifijo de Código Abierto
          </h1>
          <div className="text-xl md:text-2xl text-gray-300 mb-4">
            <TypingText 
              text="Un objeto que nunca desapareció." 
              delay={1000}
              speed={80}
            />
          </div>
          <div className="text-lg md:text-xl text-yellow-400">
            <TypingText 
              text="Un archivo vivo." 
              delay={3000}
              speed={100}
            />
          </div>
        </div>
      </section>

      {/* Section 2: Origen */}
      <section className="min-h-screen flex items-center py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-serif text-yellow-400 mb-8">Origen</h2>
            <div className="space-y-4 text-lg leading-relaxed text-gray-300">
              <p>
                Este crucifijo llegó a mis manos cuando tenía diez años. Mi padre, 
                con fe y esperanza en sus ojos me entregó el crucifijo esperando que fuera un símbolo de protección y
                guía para mí durante mi vida.
              </p>
              <p>
                "Para que nunca te olvides", me dijo. No sabía entonces que se refería 
                no solo a la fe, sino a la memoria misma. A la capacidad de los objetos 
                de volverse simbolos, en convertirse en significados de esperanza, de confiar y dejarlo todo en sus manos.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-64 h-96 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-2xl flex items-center justify-center border border-gray-700">
              <div className="text-yellow-400 text-6xl">
                <svg width="120" height="180" viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="56" y="20" width="8" height="140" fill="currentColor" />
                  <rect x="30" y="52" width="60" height="8" fill="currentColor" />
                  <circle cx="60" cy="56" r="18" fill="none" stroke="currentColor" strokeWidth="3" />
                  <rect x="52" y="150" width="16" height="16" fill="currentColor" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Presencia */}
      <section className="min-h-screen py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif text-yellow-400 mb-16 text-center">Presencia</h2>
          <Timeline />
        </div>
      </section>

      {/* Section 4: Código Vital */}
      <section className="min-h-screen py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif text-yellow-400 mb-8 text-center">Código Vital</h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Si la vida fuera código, estos serían los fragmentos que definen 
            la función de un objeto sagrado en la arquitectura del alma.
          </p>
          <CodeVital />
        </div>
      </section>

      {/* Section 5: Colectivo */}
      <section className="min-h-screen py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif text-yellow-400 mb-8 text-center">Colectivo</h2>
          <p className="text-gray-300 text-center mb-16 max-w-2xl mx-auto text-lg">
            Todos tenemos objetos que trascienden su materialidad. 
            Comparte el tuyo y forma parte de este archivo colectivo de permanencias.
          </p>
          <CollaborativeForm
            onSubmit={(data) => {
              handleArchiveSubmission(data);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>
      </section>

      {/* Section 6: Final - Archivo Persistente */}
      <section className="min-h-screen flex items-center justify-center py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-serif text-yellow-400 mb-16">Archivo Persistente</h2>
          
          <FinalTransformation />
          
          <div className="mt-16 space-y-6">
            <p className="text-2xl md:text-3xl font-serif text-white leading-relaxed">
              Lo que persiste no siempre es visible.
            </p>
            <p className="text-xl md:text-2xl text-gray-300">
              Pero puede escribirse, leerse, compartirse.
            </p>
            <p className="text-yellow-400 font-mono text-sm">
              // Fin del archivo. Inicio de la permanencia digital.
            </p>
          </div>

          <div className="mt-20 text-gray-500 text-sm">
            <p>Una experiencia de arte digital</p>
            <p>Archivo activado en {new Date().getFullYear()}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;