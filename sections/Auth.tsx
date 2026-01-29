
import React, { useState } from 'react';
import { User } from '../types';

interface Props {
  mode: 'login' | 'register';
  onAuthSuccess: (u: User) => void;
  toggleMode: () => void;
}

const Auth: React.FC<Props> = ({ mode, onAuthSuccess, toggleMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pass: '',
    confirm: ''
  });
  const [error, setError] = useState('');

  const getUsers = (): User[] => {
    const data = localStorage.getItem('magictris_database');
    return data ? JSON.parse(data) : [];
  };

  const saveUser = (u: User) => {
    const users = getUsers();
    users.push(u);
    localStorage.setItem('magictris_database', JSON.stringify(users));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const users = getUsers();

    if (mode === 'register') {
      if (formData.name.length < 3) return setError('Escribe tu nombre correctamente.');
      if (!formData.email.includes('@')) return setError('El correo debe ser real.');
      if (formData.pass.length < 4) return setError('La contraseña es muy corta.');
      if (formData.pass !== formData.confirm) return setError('Las contraseñas no coinciden.');
      
      const emailExists = users.some(u => u.email === formData.email);
      if (emailExists) return setError('Este correo ya tiene una cuenta.');

      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        username: formData.name,
        email: formData.email,
        password: formData.pass,
        nickname: formData.name,
        avatar: '🌈',
        score: 0,
        streak: 1,
        lastLogin: new Date().toISOString(),
        progressIndex: 0
      };
      saveUser(newUser);
      onAuthSuccess(newUser);
    } else {
      const user = users.find(u => u.email === formData.email && u.password === formData.pass);
      if (user) {
        onAuthSuccess(user);
      } else {
        setError('Correo o contraseña incorrectos.');
      }
    }
  };

  const inputClasses = "w-full p-4 rounded-[2rem] border-4 border-blue-400/40 bg-gray-900/90 outline-none focus:ring-4 focus:ring-blue-300/50 text-white placeholder-gray-500 text-lg font-bold transition-all shadow-inner";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 relative">
      <div className="bg-white/40 backdrop-blur-xl px-8 sm:px-12 py-10 rounded-[4rem] shadow-2xl w-full max-w-xl border-[8px] border-white/60 z-10 flex flex-col items-center">
        
        <div className="text-6xl mb-6">✨</div>
        
        <h2 className="text-4xl text-blue-700 mb-8 text-center font-magic uppercase tracking-tight drop-shadow-sm">
          {mode === 'login' ? '¡HOLA OTRA VEZ!' : '¡NUEVA CUENTA!'}
        </h2>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          {mode === 'register' && (
            <input 
              className={inputClasses}
              placeholder="¿Cómo te llamas?" 
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
            />
          )}
          <input 
            className={inputClasses}
            placeholder="Correo electrónico" 
            type="email" 
            value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
          />
          <input 
            className={inputClasses}
            placeholder="Contraseña" 
            type="password" 
            value={formData.pass} onChange={e => setFormData({...formData, pass: e.target.value})}
          />
          {mode === 'register' && (
            <input 
              className={inputClasses}
              placeholder="Repite la contraseña" 
              type="password" 
              value={formData.confirm} onChange={e => setFormData({...formData, confirm: e.target.value})}
            />
          )}
          
          {error && <p className="text-red-600 font-bold text-center bg-white/80 p-3 rounded-xl border-2 border-red-200 shadow-sm">{error}</p>}

          <button type="submit" className="btn-magic-pop w-full bg-blue-500 text-white py-5 rounded-[2rem] text-2xl font-magic shadow-xl border-b-6 border-blue-700 mt-4 active:translate-y-1">
            {mode === 'login' ? 'ENTRAR 🚀' : 'REGISTRAR ✨'}
          </button>
        </form>

        <button onClick={toggleMode} className="mt-8 text-indigo-800 font-bold text-lg hover:underline decoration-2 bg-white/30 px-6 py-2 rounded-full">
          {mode === 'login' ? 'Crear una cuenta nueva' : 'Ya tengo una cuenta'}
        </button>
      </div>
    </div>
  );
};

export default Auth;
