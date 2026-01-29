
import React from 'react';

interface Props { onBack: () => void; }

const Instructions: React.FC<Props> = ({ onBack }) => {
  const steps = [
    { icon: '🗺️', title: 'Elige un mundo', text: 'Toca los módulos para empezar a aprender.' },
    { icon: '🎴', title: 'Toca las cartas', text: 'Haz clic en las cartas para ver qué hay detrás.' },
    { icon: '🔊', title: 'Escucha y mira', text: 'Pipo te dirá cómo se dice y verás videos divertidos.' },
    { icon: '🔥', title: 'Juega cada día', text: '¡Mantén tu racha para que tu llama cambie de color!' },
  ];

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-8">
      <button onClick={onBack} className="text-blue-500 font-bold">← Volver</button>
      <h2 className="text-4xl text-blue-600 font-magic text-center mb-8">Cómo Jugar</h2>
      
      <div className="space-y-6">
        {steps.map((step, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] shadow-md border-l-8 border-blue-400 flex gap-6 items-center">
            <span className="text-6xl">{step.icon}</span>
            <div>
              <h3 className="text-2xl font-magic text-blue-500">{step.title}</h3>
              <p className="text-lg text-gray-600 font-bold">{step.text}</p>
            </div>
          </div>
        ))}
      </div>

      <button onClick={onBack} className="w-full bg-blue-500 text-white py-6 rounded-3xl text-3xl font-magic shadow-xl">
        ¡ENTENDIDO!
      </button>
    </div>
  );
};

export default Instructions;
