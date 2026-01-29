
import React, { useState } from 'react';
import { User, MagicCard, GameState } from '../types';
import VoiceButton from '../components/VoiceButton';

interface Props {
  user: User;
  card: MagicCard;
  onComplete: (scoreGain: number) => void;
  onBack: () => void;
}

const GameBoard: React.FC<Props> = ({ user, card, onComplete, onBack }) => {
  const [gameState, setGameState] = useState<GameState['step']>('intro');
  const [feedback, setFeedback] = useState<'success' | 'error' | null>(null);

  // Distractores para el juego de letras
  const distractors = ['M', 'P', 'S', 'L', 'T', 'R'].filter(l => l !== card.value).slice(0, 2);
  const letterChoices = [...distractors, card.value].sort(() => Math.random() - 0.5);

  const handleCorrectIdentify = () => {
    setFeedback('success');
    setTimeout(() => {
      setFeedback(null);
      setGameState('findLetter');
    }, 1200);
  };

  const handleCorrectFindLetter = () => {
    setFeedback('success');
    setTimeout(() => {
      setFeedback(null);
      setGameState('success');
    }, 1200);
  };

  const handleError = () => {
    setFeedback('error');
    setTimeout(() => setFeedback(null), 1200);
  };

  const bubbleClass = "w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-indigo-800/60 border-[8px] border-white/40 shadow-2xl flex flex-col items-center justify-center transition-all transform hover:scale-105 active:scale-95 overflow-hidden p-4";
  const letterCardClass = "w-36 h-52 sm:w-48 sm:h-64 rounded-[2.5rem] bg-white border-[8px] sm:border-[10px] border-indigo-200 flex items-center justify-center shadow-2xl transition-all transform hover:scale-105 active:scale-95";

  return (
    <div className="fixed inset-0 bg-indigo-950 z-[100] flex flex-col p-4 sm:p-6 overflow-y-auto">
      {/* FONDO ANIMADO */}
      <div className="fixed inset-0 pointer-events-none z-0">
          <div className="bubble text-6xl absolute left-[15%]" style={{animationDuration: '8s'}}>🫧</div>
          <div className="bubble text-4xl absolute left-[45%]" style={{animationDuration: '12s', animationDelay: '2s'}}>⭐</div>
          <div className="bubble text-7xl absolute left-[75%]" style={{animationDuration: '10s', animationDelay: '1s'}}>🫧</div>
      </div>

      <header className="relative z-10 flex justify-between items-center mb-6 shrink-0">
        <button onClick={onBack} className="bg-white/10 p-4 rounded-[2rem] border-4 border-white/20 text-3xl hover:bg-white/30 transition-all active:scale-90 shadow-lg">🏠</button>
        <div className="bg-white/10 px-6 sm:px-12 py-3 rounded-full border-4 border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.4)] backdrop-blur-md">
            <h2 className="text-xl sm:text-3xl font-magic text-white uppercase tracking-tighter">Estás aprendiendo: {card.value}</h2>
        </div>
        <div className="w-12 sm:w-16"></div>
      </header>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto w-full pb-10">
        
        {/* PASO 1: INTRODUCCIÓN */}
        {gameState === 'intro' && (
          <div className="flex flex-col items-center space-y-6 animate-fade-in text-center w-full">
            <div className="bg-white/10 backdrop-blur-2xl p-8 sm:p-12 rounded-[4rem] border-4 border-white/30 w-full max-w-lg space-y-8 shadow-2xl">
                <div className="flex flex-col items-center justify-center bg-indigo-900/40 py-8 rounded-[3rem] border-2 border-white/10 shadow-inner">
                    <h3 className="text-[100px] sm:text-[140px] leading-none font-magic text-white drop-shadow-[0_8px_0_rgba(0,0,0,0.3)] mb-6">
                        {card.value}
                    </h3>
                    <div className="bg-yellow-400 p-6 rounded-full border-4 border-white shadow-xl">
                        <span className="text-7xl sm:text-8xl">{card.icon}</span>
                    </div>
                </div>

                <div className="space-y-6">
                    <p className="text-2xl sm:text-4xl font-bold text-cyan-300 uppercase tracking-widest leading-tight">{card.description}</p>
                    <div className="flex flex-col gap-4">
                        <VoiceButton text={card.audioInstruction} label="REPETIR SONIDO" className="py-5 text-xl bg-indigo-500 rounded-full btn-magic border-b-[8px] border-indigo-800" />
                        <button 
                            onClick={() => setGameState('identify')}
                            className="btn-magic bg-pink-500 text-white py-6 rounded-[2.5rem] text-3xl font-magic shadow-2xl hover:bg-pink-600 border-b-[8px] border-pink-800"
                        >
                            ¡JUGAR! ✨
                        </button>
                    </div>
                </div>
            </div>
          </div>
        )}

        {/* JUEGO 1: Asociación */}
        {gameState === 'identify' && (
          <div className="w-full flex flex-col items-center justify-center space-y-8 animate-fade-in py-10">
            <div className="bg-indigo-900/60 backdrop-blur-xl p-8 rounded-[2.5rem] border-4 border-white/20 shadow-2xl">
                 <h3 className="text-2xl sm:text-4xl font-magic text-white leading-tight uppercase text-center">Toca el dibujo que empieza con {card.value}</h3>
            </div>
            
            <div className="flex-1 w-full flex flex-wrap items-center justify-center gap-6 sm:gap-10 px-4">
                <button onClick={handleCorrectIdentify} className={bubbleClass}>
                    <span className="text-7xl sm:text-9xl mb-2">{card.icon}</span>
                    <span className="text-xl font-magic text-white uppercase tracking-widest">{card.value}</span>
                </button>

                <button onClick={handleError} className={bubbleClass}>
                    <span className="text-7xl sm:text-9xl mb-2">🎈</span>
                </button>
                
                <button onClick={handleError} className={bubbleClass}>
                    <span className="text-7xl sm:text-9xl mb-2">🧸</span>
                </button>
            </div>
          </div>
        )}

        {/* JUEGO 2: Reconocimiento */}
        {gameState === 'findLetter' && (
          <div className="w-full flex flex-col items-center justify-center space-y-8 animate-fade-in py-10">
            <div className="bg-indigo-900/60 backdrop-blur-xl p-8 rounded-[2.5rem] border-4 border-white/20 shadow-2xl">
                 <h3 className="text-2xl sm:text-4xl font-magic text-white leading-tight uppercase text-center">Busca la letra "{card.value}"</h3>
            </div>
            
            <div className="flex-1 w-full flex flex-wrap items-center justify-center gap-6 sm:gap-10 px-4">
                {letterChoices.map((choice, idx) => (
                    <button
                        key={idx}
                        onClick={choice === card.value ? handleCorrectFindLetter : handleError}
                        className={letterCardClass}
                    >
                        <span className="text-8xl sm:text-[120px] font-magic text-indigo-600">
                            {choice}
                        </span>
                    </button>
                ))}
            </div>
          </div>
        )}

        {/* ÉXITO FINAL */}
        {gameState === 'success' && (
          <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-500 p-10 sm:p-16 rounded-[5rem] border-[10px] border-white shadow-[0_0_80px_rgba(251,191,36,0.6)] text-center space-y-10 animate-bounce-in max-w-lg w-full">
             <div className="text-[120px] sm:text-[180px] drop-shadow-2xl">🌟</div>
             <div className="space-y-2">
                <h3 className="text-6xl sm:text-7xl font-magic text-white drop-shadow-lg tracking-tighter">¡EXCELENTE!</h3>
                <p className="text-xl sm:text-2xl font-bold text-white uppercase tracking-[0.2em] opacity-90">¡Has completado esta letra!</p>
             </div>
             <button 
                onClick={() => onComplete(100)}
                className="bg-white text-orange-600 py-6 px-16 rounded-full text-3xl font-magic shadow-2xl hover:scale-110 active:scale-95 transition-all border-b-[8px] border-orange-200"
             >
                ¡SIGUIENTE! 🚀
             </button>
          </div>
        )}

        {/* FEEDBACK VISUAL */}
        {feedback === 'success' && (
            <div className="fixed inset-0 flex items-center justify-center bg-green-500/30 z-[150] backdrop-blur-lg animate-fade-in">
                <span className="text-[120px] sm:text-[200px] animate-bounce">✨</span>
            </div>
        )}
        
        {feedback === 'error' && (
            <div className="fixed inset-0 flex items-center justify-center bg-red-500/20 z-[150] backdrop-blur-md">
                <div className="bg-white p-10 rounded-[3rem] border-8 border-red-500 shadow-2xl animate-shake">
                    <span className="text-3xl font-magic text-red-600">¡Vuelve a intentar!</span>
                </div>
            </div>
        )}
      </main>
    </div>
  );
};

export default GameBoard;
