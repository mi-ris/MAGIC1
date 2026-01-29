
import React, { useState, useEffect, useRef } from 'react';

interface Props { onBack: () => void; onResult: () => void; }

const Scanner: React.FC<Props> = ({ onBack, onResult }) => {
  const [scanning, setScanning] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(stream => {
          if (videoRef.current) videoRef.current.srcObject = stream;
        })
        .catch(err => console.error("Camera error:", err));
    }

    const timer = setTimeout(() => {
      setScanning(false);
      // Simulate found card
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col text-white">
      <div className="p-6 flex justify-between items-center bg-purple-600">
        <h2 className="text-2xl font-magic">Escáner Mágico</h2>
        <button onClick={onBack} className="text-4xl">✖️</button>
      </div>

      <div className="flex-1 relative flex items-center justify-center">
        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover opacity-50" />
        
        {/* Scanning UI overlay */}
        <div className="absolute inset-0 border-[40px] border-black/60 pointer-events-none">
          <div className="w-full h-full border-4 border-dashed border-purple-400 rounded-3xl animate-pulse flex items-center justify-center">
            {scanning ? (
              <div className="text-center">
                <p className="text-2xl font-magic mb-4">Buscando Tarjeta...</p>
                <div className="w-16 h-16 border-4 border-t-purple-500 border-white rounded-full animate-spin mx-auto"></div>
              </div>
            ) : (
              <div className="bg-green-500 p-8 rounded-[3rem] text-center animate-bounce-in">
                <p className="text-3xl font-magic mb-6">¡TARJETA ENCONTRADA!</p>
                <button onClick={onResult} className="bg-white text-green-600 px-10 py-4 rounded-2xl text-2xl font-magic">¡A JUGAR!</button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-8 bg-black text-center text-gray-400">
        Coloca tu tarjeta MagicTris frente a la cámara
      </div>
    </div>
  );
};

export default Scanner;
