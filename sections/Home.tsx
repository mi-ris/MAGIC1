
import React from 'react';
import VoiceButton from '../components/VoiceButton';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6 animate-fade-in">
      <div className="relative mb-8">
        <img 
          src="https://picsum.photos/seed/happychild/400/300" 
          alt="Niño feliz" 
          className="rounded-3xl border-8 border-white shadow-xl rotate-2 hover:rotate-0 transition-transform duration-500"
        />
        <div className="absolute -top-4 -right-4 bg-yellow-400 p-4 rounded-full text-3xl shadow-lg animate-bounce">
          🌟
        </div>
      </div>
      
      <h1 className="text-5xl text-blue-600 mb-4">¡Hola Amigo!</h1>
      <p className="text-2xl text-gray-600 mb-8 max-w-md">
        ¡Qué alegría verte hoy! Vamos a aprender y jugar juntos en este mundo mágico.
      </p>

      <VoiceButton text="¡Hola Amigo! Qué alegría verte hoy. Vamos a aprender y jugar juntos en este mundo mágico." label="Escuchar saludo" className="px-8 py-4 text-xl" />
      
      <div className="mt-12 grid grid-cols-2 gap-4 w-full max-w-sm">
        <div className="bg-white p-4 rounded-3xl shadow-md border-b-4 border-blue-200">
          <span className="text-4xl">📚</span>
          <p className="font-bold text-blue-500 mt-2">Lee</p>
        </div>
        <div className="bg-white p-4 rounded-3xl shadow-md border-b-4 border-green-200">
          <span className="text-4xl">🎨</span>
          <p className="font-bold text-green-500 mt-2">Crea</p>
        </div>
        <div className="bg-white p-4 rounded-3xl shadow-md border-b-4 border-yellow-200">
          <span className="text-4xl">🧸</span>
          <p className="font-bold text-yellow-500 mt-2">Juega</p>
        </div>
        <div className="bg-white p-4 rounded-3xl shadow-md border-b-4 border-pink-200">
          <span className="text-4xl">💖</span>
          <p className="font-bold text-pink-500 mt-2">Siente</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
