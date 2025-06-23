import React, { useEffect, useRef } from 'react';
import * as Tone from 'tone';

interface SoundManagerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

class AudioManager {
  private static instance: AudioManager;
  private synth: Tone.Synth;
  private ambientSynth: Tone.AMSynth;
  private reverb: Tone.Reverb;
  private delay: Tone.PingPongDelay;
  private isInitialized: boolean = false;

  private constructor() {
    this.reverb = new Tone.Reverb({
      decay: 4,
      preDelay: 0.01,
      wet: 0.3
    });

    this.delay = new Tone.PingPongDelay({
      delayTime: "8n",
      feedback: 0.2,
      wet: 0.1
    });

    this.synth = new Tone.Synth({
      oscillator: {
        type: "sine"
      },
      envelope: {
        attack: 0.8,
        decay: 0.2,
        sustain: 0.3,
        release: 2
      }
    });

    this.ambientSynth = new Tone.AMSynth({
      harmonicity: 2,
      oscillator: {
        type: "sine"
      },
      envelope: {
        attack: 2,
        decay: 1,
        sustain: 0.5,
        release: 3
      },
      modulation: {
        type: "sine"
      },
      modulationEnvelope: {
        attack: 0.5,
        decay: 0,
        sustain: 1,
        release: 0.5
      }
    });

    // Connect effects chain
    this.synth.chain(this.delay, this.reverb, Tone.Destination);
    this.ambientSynth.chain(this.reverb, Tone.Destination);
  }

  public static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  public async initialize() {
    if (!this.isInitialized) {
      await Tone.start();
      await this.reverb.generate();
      this.isInitialized = true;
    }
  }

  // Sonido para el crucifijo flotante (entrada)
  public playFloatingCrucifixSound() {
    if (!this.isInitialized) return;
    
    const now = Tone.now();
    this.synth.triggerAttackRelease("C4", "2n", now);
    this.synth.triggerAttackRelease("E4", "2n", now + 0.5);
    this.synth.triggerAttackRelease("G4", "2n", now + 1);
  }

  // Sonido ambiente suave para navegación
  public playAmbientTone() {
    if (!this.isInitialized) return;
    
    this.ambientSynth.triggerAttackRelease("A3", "1n");
  }

  // Sonido para hover en códigos
  public playCodeHoverSound() {
    if (!this.isInitialized) return;
    
    const now = Tone.now();
    this.synth.triggerAttackRelease("F4", "16n", now);
  }

  // Sonido para timeline (campanas suaves)
  public playTimelineSound() {
    if (!this.isInitialized) return;
    
    const bellSynth = new Tone.MetalSynth({
      envelope: {
        attack: 0.001,
        decay: 1.4,
        release: 0.2
      },
      harmonicity: 5.1,
      modulationIndex: 32,
      resonance: 4000,
      octaves: 1.5
    }).chain(this.reverb, Tone.Destination);

    bellSynth.frequency.value = 400;
    bellSynth.triggerAttackRelease("C5", "4n");
    
    // Clean up
    setTimeout(() => {
      bellSynth.dispose();
    }, 3000);
  }

  // Sonido para transformación final
  public playTransformationSound() {
    if (!this.isInitialized) return;
    
    const now = Tone.now();
    // Secuencia ascendente que representa transformación
    const notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];
    notes.forEach((note, index) => {
      this.synth.triggerAttackRelease(note, "8n", now + index * 0.2);
    });
  }

  // Sonido para envío de formulario
  public playSubmissionSound() {
    if (!this.isInitialized) return;
    
    const now = Tone.now();
    this.synth.triggerAttackRelease("C5", "4n", now);
    this.synth.triggerAttackRelease("E5", "4n", now + 0.3);
    this.synth.triggerAttackRelease("G5", "2n", now + 0.6);
  }

  // Ambiente continuo muy sutil
  public startAmbientLoop(): Tone.Loop | null {
    if (!this.isInitialized) return null;

    const loop = new Tone.Loop((time: any) => {
      // Tono muy sutil cada 8 segundos
      this.ambientSynth.triggerAttackRelease("A2", "1n", time);
    }, "8n").start(0);

    Tone.Transport.start();
    
    return loop;
  }

  public stopAmbientLoop(loop: Tone.Loop) {
    if (loop) {
      loop.dispose();
    }
    Tone.Transport.stop();
  }
}

const SoundManager: React.FC<SoundManagerProps> = ({ isPlaying, onToggle }) => {
  const audioManager = useRef(AudioManager.getInstance());
  const ambientLoop = useRef<Tone.Loop | null>(null);

  useEffect(() => {
    const initializeAudio = async () => {
      await audioManager.current.initialize();
    };

    initializeAudio();
  }, []);

  useEffect(() => {
    if (isPlaying) {
      ambientLoop.current = audioManager.current.startAmbientLoop();
    } else {
      if (ambientLoop.current) {
        audioManager.current.stopAmbientLoop(ambientLoop.current);
        ambientLoop.current = null;
      }
    }

    return () => {
      if (ambientLoop.current) {
        audioManager.current.stopAmbientLoop(ambientLoop.current);
      }
    };
  }, [isPlaying]);

  return (
    <button
      onClick={onToggle}
      className="sound-button"
      title={isPlaying ? "Desactivar sonidos" : "Activar sonidos"}
    >
      {isPlaying ? "🔊" : "🔇"}
    </button>
  );
};

// Hook personalizado para usar el AudioManager
export const useAudioManager = () => {
  const audioManager = AudioManager.getInstance();

  return {
    playFloatingCrucifixSound: () => audioManager.playFloatingCrucifixSound(),
    playAmbientTone: () => audioManager.playAmbientTone(),
    playCodeHoverSound: () => audioManager.playCodeHoverSound(),
    // playTimelineSound: () => audioManager.playTimelineSound(),
    playTransformationSound: () => audioManager.playTransformationSound(),
    playSubmissionSound: () => audioManager.playSubmissionSound(),
  };
};

export default SoundManager;