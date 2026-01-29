
import React from 'react';
import { User, Section } from '../types';
import { MAGIC_PATH } from '../services/mockData';

interface Props {
  user: User;
  setSection: (s: Section) => void;
  onSelectCard: (index: number) => void;
}

const Hub: React.FC<Props> = ({ user, setSection, onSelectCard }) => {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* HEADER CRISTALINO */}
      <header className="fixed top-0 left-0 right-0 h-24 bg-indigo-900/60 backdrop-blur-3xl shadow-2xl z-50 px-4 flex items-center justify-between border-b-4 border-white/20">
        <div className="flex items-center gap-2 sm:gap-3">
            <button onClick={() => setSection('profile')} className="flex items-center gap-2 bg-white/10 p-1 pr-3 rounded-full border-2 border-white/40 hover:bg-white/30 transition-all active:scale-95">
                <span className="text-2xl sm:text-3xl bg-white p-1 rounded-full shadow-lg">{user.avatar}</span>
                <span className="text-sm font-magic text-white hidden sm:block">{user.nickname}</span>
            </button>
            
            <button 
                onClick={() => setSection('info')}
                className="group flex flex-col items-center justify-center bg-yellow-400 text-blue-900 px-3 py-1 rounded-xl shadow-[0_0_15px_rgba(250,204,21,0.5)] border-2 border-white transition-transform hover:scale-110 active:scale-95"
            >
                <span className="text-base">💡</span>
                <span className="text-[6px] font-magic font-bold tracking-tighter leading-none">INFO</span>
            </button>
        </div>

        <div className="flex gap-2 sm:gap-3">
            <div className="bg-indigo-500/50 px-2 sm:px-3 py-1 rounded-xl border-2 border-white/30 flex flex-col items-center shadow-inner">
                <div className="flex items-center gap-1">
                    <span className="text-base">⭐</span>
                    <span className="text-lg font-magic text-white">{user.score}</span>
                </div>
                <span className="text-[6px] font-magic text-cyan-200 font-bold uppercase">Puntos</span>
            </div>
            
            <div className="bg-orange-500 px-2 sm:px-3 py-1 rounded-xl border-2 border-white shadow-xl flex flex-col items-center">
                <div className="flex items-center gap-1">
                    <span className="text-base">🔥</span>
                    <span className="text-lg font-magic text-white">{user.streak}</span>
                </div>
                <span className="text-[6px] font-magic text-orange-100 font-bold uppercase">Racha</span>
            </div>
        </div>
      </header>

      {/* CONTENIDO SCROLLABLE */}
      <main className="flex-1 pt-28 pb-28 px-4 max-w-6xl mx-auto w-full overflow-y-auto">
        <div className="flex flex-col items-center mb-8">
            <h2 className="text-4xl sm:text-5xl font-magic text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] text-center mb-2 uppercase tracking-tighter">Camino Mágico</h2>
            <div className="bg-white/10 px-6 py-2 rounded-full border-2 border-white/20 backdrop-blur-md">
                <p className="text-xs sm:text-sm text-cyan-200 font-bold uppercase tracking-widest text-center">¡Toca una letra para empezar!</p>
            </div>
        </div>

        {/* CUADRÍCULA DEL ABECEDARIO */}
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-4 sm:gap-6 pb-10">
            {MAGIC_PATH.map((card, index) => {
                const isUnlocked = index <= user.progressIndex;
                const isNext = index === user.progressIndex;
                
                return (
                    <button
                        key={card.id}
                        disabled={!isUnlocked}
                        onClick={() => onSelectCard(index)}
                        className={`group relative aspect-[4/5] p-2 rounded-[2rem] flex flex-col items-center justify-around transition-all duration-500 shadow-xl border-4 border-white/20 ${
                            isUnlocked 
                            ? `${card.color} ${isNext ? 'ring-8 ring-yellow-400 scale-110 shadow-[0_0_30px_rgba(251,191,36,0.8)] z-10' : 'opacity-100 hover:scale-105'}` 
                            : 'bg-indigo-950/40 grayscale opacity-40 cursor-not-allowed'
                        }`}
                    >
                        {/* DIBUJO MUCHO MÁS GRANDE */}
                        <div className={`text-6xl sm:text-8xl leading-none drop-shadow-2xl transition-transform duration-300 ${isUnlocked ? 'group-hover:scale-110' : ''}`}>
                            {isUnlocked ? card.icon : '🔒'}
                        </div>
                        
                        {/* LETRA (MANTIENE TAMAÑO ORIGINAL) */}
                        <h3 className="text-3xl sm:text-5xl font-magic text-white tracking-tighter drop-shadow-lg leading-none">
                            {isUnlocked ? card.value : ''}
                        </h3>
                        
                        {isNext && (
                            <div className="absolute -top-3 -right-3 bg-yellow-400 p-2 rounded-full border-4 border-white shadow-xl animate-bounce text-lg z-20">
                                ✨
                            </div>
                        )}
                    </button>
                );
            })}
        </div>
      </main>

      {/* BARRA DE PROGRESO INFERIOR */}
      <footer className="fixed bottom-0 left-0 right-0 p-4 z-40 flex justify-center pointer-events-none">
         <div className="bg-indigo-900/90 backdrop-blur-xl p-4 rounded-[2rem] border-2 border-cyan-400/50 shadow-2xl flex items-center gap-4 w-full max-w-sm pointer-events-auto">
            <div className="text-3xl shrink-0 floating-gumi">👾</div>
            <div className="flex-1">
                <div className="flex justify-between items-end mb-1">
                    <p className="text-xs font-magic text-cyan-300">Progreso</p>
                    <p className="text-[10px] font-bold text-white opacity-80">{user.progressIndex} / {MAGIC_PATH.length}</p>
                </div>
                <div className="w-full bg-indigo-950/80 h-3 rounded-full border border-white/10 overflow-hidden shadow-inner">
                    <div 
                        className="h-full bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 transition-all duration-1000 ease-out"
                        style={{ width: `${(user.progressIndex / MAGIC_PATH.length) * 100}%` }}
                    ></div>
                </div>
            </div>
         </div>
      </footer>
    </div>
  );
};

export default Hub;
