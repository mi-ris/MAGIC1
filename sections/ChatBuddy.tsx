
import React, { useState, useRef, useEffect } from 'react';
import { getGeminiChatResponse, generateSpeech, decodePCM } from '../services/geminiService';
import VoiceButton from '../components/VoiceButton';

const ChatBuddy: React.FC = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsTyping(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      
      const response = await getGeminiChatResponse(history, userText);
      const modelText = response.text || "¡Perdón! Mi robot se distrajo un poquito. ¿Me dices otra vez?";
      
      setMessages(prev => [...prev, { role: 'model', text: modelText }]);
      
      // Auto-speak the response for accessibility
      const audioData = await generateSpeech(modelText);
      if (audioData) {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        const buffer = await decodePCM(audioData, audioCtx);
        const source = audioCtx.createBufferSource();
        source.buffer = buffer;
        source.connect(audioCtx.destination);
        source.start();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  const suggestions = [
    "¡Hola Pipo!",
    "Cuéntame un chiste",
    "¿Qué animal eres?",
    "Me siento feliz",
  ];

  return (
    <div className="flex flex-col h-[80vh] md:h-[70vh] p-4 pb-24 md:pt-24 max-w-2xl mx-auto">
      <div className="bg-purple-100 p-4 rounded-t-3xl border-b-4 border-purple-200 flex items-center gap-4">
        <span className="text-5xl">🤖</span>
        <div>
          <h2 className="text-2xl text-purple-700">Chat con Pipo</h2>
          <p className="text-sm text-purple-500 font-bold uppercase">Tu amigo robot inteligente</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-white border-x-4 border-purple-50 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-10 opacity-60">
            <span className="text-6xl mb-4 block">👋</span>
            <p className="text-xl">¡Hola! Soy Pipo. Escríbeme algo lindo para charlar.</p>
          </div>
        )}
        
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-3xl shadow-sm ${
              m.role === 'user' 
                ? 'bg-blue-500 text-white rounded-tr-none' 
                : 'bg-purple-50 text-gray-800 border-2 border-purple-100 rounded-tl-none'
            }`}>
              <p className="text-xl leading-relaxed">{m.text}</p>
              {m.role === 'model' && (
                <div className="mt-2 flex justify-end">
                   <VoiceButton text={m.text} className="!p-2 !bg-purple-400" />
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-purple-50 p-4 rounded-3xl animate-pulse text-purple-400">
              Pipo está pensando... 🧠
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="bg-purple-50 p-4 rounded-b-3xl border-t-2 border-purple-100">
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => { setInput(s); sendMessage(); }}
              className="bg-white px-4 py-2 rounded-full text-sm font-bold text-purple-600 border border-purple-200 whitespace-nowrap btn-bounce hover:bg-purple-600 hover:text-white transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
        
        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe aquí..."
            className="flex-1 p-4 rounded-2xl border-2 border-purple-200 focus:border-purple-500 outline-none text-xl"
          />
          <button 
            type="submit"
            className="bg-purple-600 text-white px-6 py-4 rounded-2xl text-2xl shadow-lg btn-bounce"
          >
            🚀
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBuddy;
