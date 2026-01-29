
import React, { useState } from 'react';
import { Flashcard } from '../types';
import VoiceButton from '../components/VoiceButton';

const flashcards: Flashcard[] = [
  { id: 1, word: 'Manzana', image: 'https://picsum.photos/seed/apple/200/200', category: 'Frutas' },
  { id: 2, word: 'Perro', image: 'https://picsum.photos/seed/dog/200/200', category: 'Animales' },
  { id: 3, word: 'Sol', image: 'https://picsum.photos/seed/sun/200/200', category: 'Naturaleza' },
  { id: 4, word: 'Casa', image: 'https://picsum.photos/seed/house/200/200', category: 'Lugares' },
  { id: 5, word: 'Pelota', image: 'https://picsum.photos/seed/ball/200/200', category: 'Juguetes' },
  { id: 6, word: 'Gato', image: 'https://picsum.photos/seed/cat/200/200', category: 'Animales' },
];

const Learning: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const card = flashcards[currentIdx];

  const next = () => setCurrentIdx((prev) => (prev + 1) % flashcards.length);
  const prev = () => setCurrentIdx((prev) => (prev - 1 + flashcards.length) % flashcards.length);

  return (
    <div className="p-6 pb-24 md:pt-24 flex flex-col items-center">
      <h2 className="text-4xl text-green-600 mb-8">Aprendemos Palabras</h2>
      
      <div className="bg-white rounded-[3rem] p-8 shadow-2xl border-b-8 border-green-100 w-full max-w-sm flex flex-col items-center transition-all">
        <div className="bg-green-50 rounded-full px-4 py-1 mb-4 text-green-600 font-bold uppercase text-sm tracking-widest">
          {card.category}
        </div>
        
        <img 
          src={card.image} 
          alt={card.word} 
          className="w-48 h-48 rounded-3xl object-cover mb-6 border-4 border-gray-100 shadow-inner" 
        />
        
        <h3 className="text-4xl text-gray-800 mb-6">{card.word}</h3>
        
        <VoiceButton text={card.word} label="¿Cómo se dice?" className="w-full py-4 text-lg bg-green-500 hover:bg-green-600" />
      </div>

      <div className="flex gap-4 mt-8 w-full max-w-sm">
        <button 
          onClick={prev}
          className="flex-1 bg-white p-4 rounded-3xl shadow-md border-b-4 border-gray-200 text-3xl btn-bounce"
        >
          ⬅️
        </button>
        <button 
          onClick={next}
          className="flex-1 bg-white p-4 rounded-3xl shadow-md border-b-4 border-gray-200 text-3xl btn-bounce"
        >
          ➡️
        </button>
      </div>

      <p className="mt-8 text-gray-500 font-bold">
        {currentIdx + 1} de {flashcards.length}
      </p>
    </div>
  );
};

export default Learning;
