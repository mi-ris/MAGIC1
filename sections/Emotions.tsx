
import React, { useState } from 'react';
import { Emotion } from '../types';
import VoiceButton from '../components/VoiceButton';

const emotionsList: Emotion[] = [
  { id: 'happy', name: 'Feliz', emoji: '😊', color: 'bg-yellow-100 border-yellow-400 text-yellow-700', description: '¡Me siento muy contento y quiero sonreír!' },
  { id: 'sad', name: 'Triste', emoji: '😢', color: 'bg-blue-100 border-blue-400 text-blue-700', description: 'Me siento un poco bajito y quizás quiera llorar un poco.' },
  { id: 'angry', name: 'Enojado', emoji: '😠', color: 'bg-red-100 border-red-400 text-red-700', description: '¡Grrr! Algo no me gusta y me siento molesto.' },
  { id: 'surprised', name: 'Sorprendido', emoji: '😮', color: 'bg-purple-100 border-purple-400 text-purple-700', description: '¡Oh! ¡No me lo esperaba! ¡Qué sorpresa!' },
  { id: 'tired', name: 'Cansado', emoji: '😴', color: 'bg-green-100 border-green-400 text-green-700', description: 'Tengo sueño y quiero descansar un ratito.' },
];

const Emotions: React.FC = () => {
  const [selected, setSelected] = useState<Emotion | null>(null);

  return (
    <div className="p-6 pb-24 md:pt-24 max-w-4xl mx-auto">
      <h2 className="text-4xl text-pink-600 text-center mb-8">¿Cómo te sientes hoy?</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-10">
        {emotionsList.map((emo) => (
          <button
            key={emo.id}
            onClick={() => setSelected(emo)}
            className={`flex flex-col items-center p-4 rounded-3xl border-b-4 transition-all btn-bounce ${
              selected?.id === emo.id ? emo.color + ' scale-105 shadow-xl' : 'bg-white border-gray-200 grayscale-[0.5]'
            }`}
          >
            <span className="text-6xl mb-2">{emo.emoji}</span>
            <span className="font-bold text-lg">{emo.name}</span>
          </button>
        ))}
      </div>

      {selected ? (
        <div className={`p-8 rounded-[3rem] shadow-xl border-l-8 border-b-8 animate-bounce-in ${selected.color}`}>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <span className="text-8xl">{selected.emoji}</span>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-3xl font-bold mb-4">Estás {selected.name}</h3>
              <p className="text-xl mb-6 opacity-90">{selected.description}</p>
              <VoiceButton text={`Te sientes ${selected.name}. ${selected.description}`} label="Escuchar" className="bg-white !text-gray-800" />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center p-12 bg-white rounded-3xl border-2 border-dashed border-pink-200">
          <p className="text-2xl text-gray-400">Toca una carita para decirnos cómo estás</p>
        </div>
      )}
    </div>
  );
};

export default Emotions;
