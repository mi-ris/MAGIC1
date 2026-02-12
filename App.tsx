
import React, { useState, useEffect } from 'react';
import { User, Section } from './types';
import PreLogin from './sections/PreLogin';
import Auth from './sections/Auth';
import Hub from './sections/Hub';
import GameBoard from './sections/GameBoard';
import Profile from './sections/Profile';
import Info from './sections/Info';
import { MAGIC_PATH } from './services/mockData';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [section, setSection] = useState<Section>('pre-login');
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('magictris_user');
    if (saved) {
      setUser(JSON.parse(saved));
      setSection('hub');
    }
  }, []);

  const handleAuthSuccess = (u: User) => {
    setUser(u);
    localStorage.setItem('magictris_user', JSON.stringify(u));
    setSection('hub');
  };

  const handleLogout = () => {
    localStorage.removeItem('magictris_user');
    setUser(null);
    setSection('pre-login');
  };

  const handleGameComplete = (scoreGain: number) => {
    if (!user || selectedCardIndex === null) return;

    const newProgress = Math.max(user.progressIndex, selectedCardIndex + 1);
    const updatedUser: User = {
      ...user,
      score: user.score + scoreGain,
      progressIndex: newProgress
    };

    setUser(updatedUser);
    localStorage.setItem('magictris_user', JSON.stringify(updatedUser));
    setSelectedCardIndex(null);
    setSection('hub');
  };

  const renderSection = () => {
    if (selectedCardIndex !== null && user) {
        return (
            <GameBoard 
                user={user} 
                card={MAGIC_PATH[selectedCardIndex]} 
                onComplete={handleGameComplete}
                onBack={() => setSelectedCardIndex(null)}
            />
        );
    }

    switch (section) {
      case 'pre-login': return <PreLogin onStart={() => setSection('login')} />;
      case 'login': return (
        <Auth 
            mode="login" 
            onAuthSuccess={handleAuthSuccess} 
            toggleMode={() => setSection('register')} 
        />
      );
      case 'register': return (
        <Auth 
            mode="register" 
            onAuthSuccess={handleAuthSuccess} 
            toggleMode={() => setSection('login')} 
        />
      );
      case 'hub': return user ? (
        <Hub 
            user={user} 
            setSection={setSection} 
            onSelectCard={(idx) => setSelectedCardIndex(idx)} 
        />
      ) : null;
      case 'profile': return user ? (
        <Profile 
            user={user} 
            onBack={() => setSection('hub')} 
            onLogout={handleLogout}
            onUpdate={(updated) => {
                const newUser = {...user, ...updated};
                setUser(newUser);
                localStorage.setItem('magictris_user', JSON.stringify(newUser));
            }}
        />
      ) : null;
      case 'info': return <Info onBack={() => setSection('hub')} />;
      default: return <PreLogin onStart={() => setSection('login')} />;
    }
  };

  console.log("[v0] App rendering, section:", section, "selectedCardIndex:", selectedCardIndex, "user:", user?.nickname);

  return (
    <div className="min-h-screen">
      {renderSection()}
    </div>
  );
};

export default App;
