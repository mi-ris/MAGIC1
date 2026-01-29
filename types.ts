
export type Section = 'pre-login' | 'login' | 'register' | 'hub' | 'play' | 'profile' | 'info';

export interface User {
  id: string;
  username: string;
  email: string;
  password?: string;
  nickname: string;
  avatar: string;
  score: number;
  streak: number;
  lastLogin: string;
  progressIndex: number;
}

export interface MagicCard {
  id: string;
  title: string;
  value: string;
  type: 'vocal' | 'consonante' | 'silaba';
  color: string;
  icon: string;
  monster: string;
  description: string;
  audioInstruction: string;
}

export interface GameState {
  card: MagicCard;
  step: 'intro' | 'identify' | 'findLetter' | 'success';
  score: number;
}

export interface Flashcard {
  id: number;
  word: string;
  image: string;
  category: string;
}

export interface Emotion {
  id: string;
  name: string;
  emoji: string;
  color: string;
  description: string;
}
