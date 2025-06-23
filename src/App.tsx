import React, { useEffect, useState } from 'react';
import FloatingCrucifix from './components/FloatingCrucifix';
import TypingText from './components/TypingText';
import Timeline from './components/Timeline';
import CodeVital from './components/CodeVital';
import CollaborativeForm from './components/CollaborativeForm';
import FinalTransformation from './components/FinalTransformation';
import UserArchive from './components/UserArchive';
import SoundManager, { useAudioManager } from './components/SoundManager';

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [showUserArchive, setShowUserArchive] = useState(false);
  const [userArchiveData, setUserArchiveData] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioManager = useAudioManager();

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
          if (currentSection !== index) {
            setCurrentSection(index);
            // Sonido suave al cambiar de sección
            if (soundEnabled) {
              audioManager.playAmbientTone();
            }
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentSection, soundEnabled, audioManager]);

  const handleArchiveSubmission = (data: React.SetStateAction<null>) => {
    setUserArchiveData(data);
    setShowUserArchive(true);
    if (soundEnabled) {
      audioManager.playSubmissionSound();
    }
  };

  const handleBackToMain = () => {
    setShowUserArchive(false);
    setUserArchiveData(null);
  };

  if (showUserArchive && userArchiveData) {
    return <UserArchive data={userArchiveData} onBack={handleBackToMain} />;
  }

  return (
    <div className="min-h-screen text-primary">
      {/* Sound Manager */}
      <SoundManager 
        isPlaying={soundEnabled} 
        onToggle={() => setSoundEnabled(!soundEnabled)} 
      />

      {/* Navigation Dots - Vertical */}
      <div className="nav-dots">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <button
            key={index}
            onClick={() => {
              const section = document.querySelectorAll('section')[index];
              section?.scrollIntoView({ behavior: 'smooth' });
              if (soundEnabled) {
                audioManager.playAmbientTone();
              }
            }}
            className={`nav-dot ${currentSection === index ? 'active' : ''}`}
          />
        ))}
      </div>

      {/* Section 1: Intro - Archivo Activado */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden section-bg-primary">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>
        <div className="text-center z-10 px-4">
          <div 
            onMouseEnter={() => {
              if (soundEnabled) {
                audioManager.playFloatingCrucifixSound();
              }
            }}
          >
            <FloatingCrucifix />
          </div>
          <h1 className="text-4xl md:text-6xl font-serif mb-8 text-primary">
            Crucifijo de Código Abierto
          </h1>
          <div className="text-xl md:text-2xl text-secondary mb-4">
            <TypingText 
              text="Un objeto que nunca desapareció." 
              delay={1000}
              speed={80}
            />
          </div>
          <div className="text-lg md:text-xl text-accent">
            <TypingText 
              text="Un archivo vivo." 
              delay={3000}
              speed={100}
            />
          </div>
        </div>
      </section>

      {/* Section 2: Origen */}
      <section className="min-h-screen flex items-center py-20 px-4 section-bg-secondary">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-serif text-accent mb-8">Origen</h2>
            <div className="space-y-4 text-lg leading-relaxed text-dark">
              <p>
                Este crucifijo llegó a mis manos cuando tenía diez años. Mi padre, 
                con fe y esperanza en sus ojos me entregó el crucifijo esperando que fuera un símbolo de protección y
                guía para mí durante mi vida.
              </p>
              <p>
                "Para que nunca te olvides", me dijo. No sabía entonces que se refería 
                no solo a la fe, sino a la memoria misma. A la capacidad de los objetos 
                de volverse símbolos, en convertirse en significados de esperanza, de confiar y dejarlo todo en sus manos.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="card w-64 h-96 flex items-center justify-center">
              <div className="text-accent text-6xl">
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
      <section className="min-h-screen py-20 px-4 section-bg-tertiary">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif text-accent mb-16 text-center">Presencia</h2>
          <Timeline />
        </div>
      </section>

      {/* Section 4: Código Vital */}
      <section className="min-h-screen py-20 px-4 section-bg-primary">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif text-accent mb-8 text-center">Código Vital</h2>
          <p className="text-secondary text-center mb-16 max-w-2xl mx-auto">
            Si la vida fuera código, estos serían los fragmentos que definen 
            la función de un objeto sagrado en la arquitectura del alma.
          </p>
          <CodeVital />
        </div>
      </section>

      {/* Section 5: Colectivo */}
      <section className="min-h-screen py-20 px-4 section-bg-secondary">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif text-accent mb-8 text-center">Colectivo</h2>
          <p className="text-dark text-center mb-16 max-w-2xl mx-auto text-lg">
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
      <section className="min-h-screen flex items-center justify-center py-20 px-4 section-bg-tertiary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-serif text-accent mb-16">Archivo Persistente</h2>
          
          <div 
            onMouseEnter={() => {
              if (soundEnabled) {
                audioManager.playTransformationSound();
              }
            }}
          >
            <FinalTransformation />
          </div>
          
          <div className="mt-16 space-y-6">
            <p className="text-2xl md:text-3xl font-serif text-dark leading-relaxed">
              Lo que persiste no siempre es visible.
            </p>
            <p className="text-xl md:text-2xl text-dark">
              Pero puede escribirse, leerse, compartirse.
            </p>
            <p className="text-accent font-mono text-sm">
              // Fin del archivo. Inicio de la permanencia digital.
            </p>
          </div>

          <div className="mt-20 text-dark text-sm">
            <p>Una experiencia de arte digital</p>
            <p>Archivo activado en {new Date().getFullYear()}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;