import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useAudioManager } from './SoundManager';

interface CollaborativeFormProps {
  onSubmit: (data: any) => void;
}

const CollaborativeForm: React.FC<CollaborativeFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    objeto: '',
    historia: '',
    significado: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const audioManager = useAudioManager();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store in localStorage for this demo
    const existingEntries = JSON.parse(localStorage.getItem('crucifijo-entries') || '[]');
    const newEntry = {
      ...formData,
      timestamp: new Date().toISOString()
    };
    existingEntries.push(newEntry);
    localStorage.setItem('crucifijo-entries', JSON.stringify(existingEntries));
    
    // Call the parent's onSubmit to trigger archive view
    onSubmit(newEntry);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="timeline-icon mx-auto mb-4">
          <Send className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-serif text-primary mb-4">Archivo Registrado</h3>
        <p className="text-dark">Tu objeto sagrado ahora forma parte de esta colección digital.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <div>
        <label htmlFor="objeto" className="block text-primary font-serif mb-2">
          ¿Cuál es tu objeto sagrado?
        </label>
        <input
          type="text"
          id="objeto"
          name="objeto"
          value={formData.objeto}
          onChange={handleChange}
          placeholder="Una cadena, un libro, una fotografía..."
          className="form-input w-full"
          required
        />
      </div>

      <div>
        <label htmlFor="historia" className="block text-primary font-serif mb-2">
          ¿Cuál es su historia?
        </label>
        <textarea
          id="historia"
          name="historia"
          value={formData.historia}
          onChange={handleChange}
          placeholder="Cuéntanos de dónde viene, quién te lo dio, qué representa..."
          rows={4}
          className="form-input w-full resize-none"
          required
        />
      </div>

      <div>
        <label htmlFor="significado" className="block text-primary font-serif mb-2">
          ¿Por qué persiste en tu vida?
        </label>
        <textarea
          id="significado"
          name="significado"
          value={formData.significado}
          onChange={handleChange}
          placeholder="Qué lo hace especial, por qué nunca lo has perdido..."
          rows={3}
          className="form-input w-full resize-none"
          required
        />
      </div>

      <button
        type="submit"
        className="submit-button w-full flex items-center justify-center space-x-2"
        onMouseEnter={() => audioManager.playAmbientTone()}
      >
        <Send className="w-5 h-5" />
        <span>Activar Archivo</span>
      </button>
    </form>
  );
};

export default CollaborativeForm;