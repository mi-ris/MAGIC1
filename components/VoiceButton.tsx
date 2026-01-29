
import React, { useState } from 'react';
import { generateSpeech, decodePCM } from '../services/geminiService';

interface VoiceButtonProps {
  text: string;
  label?: string;
  className?: string;
}

const VoiceButton: React.FC<VoiceButtonProps> = ({ text, label, className }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    
    const audioData = await generateSpeech(text);
    if (audioData) {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const buffer = await decodePCM(audioData, audioCtx);
      const source = audioCtx.createBufferSource();
      source.buffer = buffer;
      source.connect(audioCtx.destination);
      source.onended = () => setIsPlaying(false);
      source.start();
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <button
      onClick={handlePlay}
      disabled={isPlaying}
      className={`flex items-center justify-center gap-2 p-3 rounded-full bg-blue-500 text-white shadow-md hover:bg-blue-600 transition-colors btn-bounce disabled:opacity-50 ${className}`}
    >
      <span className="text-xl">{isPlaying ? '⏳' : '🔊'}</span>
      {label && <span className="font-bold">{label}</span>}
    </button>
  );
};

export default VoiceButton;
