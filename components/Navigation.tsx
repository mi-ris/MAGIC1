
import React from 'react';
import { Section } from '../types';

interface NavigationProps {
  currentSection: Section;
  setSection: (section: Section) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentSection, setSection }) => {
  const items = [
    { id: 'home', icon: '🏠', label: 'Inicio', color: 'bg-blue-400' },
    { id: 'learn', icon: '🍎', label: 'Aprender', color: 'bg-green-400' },
    { id: 'games', icon: '🎲', label: 'Jugar', color: 'bg-yellow-400' },
    { id: 'chat', icon: '🤖', label: 'Amigo', color: 'bg-purple-400' },
    { id: 'emotions', icon: '😊', label: 'Sentir', color: 'bg-pink-400' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl p-4 flex justify-around items-center rounded-t-3xl border-t-4 border-gray-100 z-50 md:top-0 md:bottom-auto md:rounded-t-none md:rounded-b-3xl">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => setSection(item.id as Section)}
          className={`flex flex-col items-center p-2 rounded-2xl transition-all btn-bounce ${
            currentSection === item.id ? `${item.color} text-white scale-110 shadow-lg` : 'text-gray-500'
          }`}
        >
          <span className="text-3xl md:text-4xl">{item.icon}</span>
          <span className="text-xs font-bold mt-1 uppercase tracking-wider">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
