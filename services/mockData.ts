
import { MagicCard } from '../types';

// Pictogramas claros (Emojis representativos para accesibilidad)
const PICTOGRAMS: Record<string, {icon: string, word: string}> = {
  'A': { icon: '🐝', word: 'Abeja' },
  'E': { icon: '🐘', word: 'Elefante' },
  'I': { icon: '🏝️', word: 'Isla' },
  'O': { icon: '🐻', word: 'Oso' },
  'U': { icon: '🍇', word: 'Uva' },
  'B': { icon: '⛵', word: 'Barco' },
  'C': { icon: '🏠', word: 'Casa' },
  'D': { icon: '🎲', word: 'Dado' },
  'F': { icon: '🍓', word: 'Fresa' },
  'G': { icon: '🐱', word: 'Gato' },
  'H': { icon: '🍦', word: 'Helado' },
  'J': { icon: '🦒', word: 'Jirafa' },
  'K': { icon: '🐨', word: 'Koala' },
  'L': { icon: '🦁', word: 'León' },
  'M': { icon: '🐒', word: 'Mono' },
  'N': { icon: '🍊', word: 'Naranja' },
  'Ñ': { icon: '🐗', word: 'Ñandú' },
  'P': { icon: '🦆', word: 'Pato' },
  'Q': { icon: '🧀', word: 'Queso' },
  'R': { icon: '🐭', word: 'Ratón' },
  'S': { icon: '☀️', word: 'Sol' },
  'T': { icon: '🐢', word: 'Tortuga' },
  'V': { icon: '🐄', word: 'Vaca' },
  'W': { icon: '🧇', word: 'Wafle' },
  'X': { icon: '🎻', word: 'Xilófono' },
  'Y': { icon: '🪀', word: 'Yo-yo' },
  'Z': { icon: '🥕', word: 'Zanahoria' }
};

const colors = [
  'bg-pink-500', 'bg-purple-500', 'bg-indigo-500', 'bg-cyan-500', 
  'bg-yellow-500', 'bg-orange-500', 'bg-red-500', 'bg-green-500'
];

// El orden de las llaves en PICTOGRAMS ya define el orden de aparición (Vocales -> Consonantes)
export const MAGIC_PATH: MagicCard[] = Object.keys(PICTOGRAMS).map((letter, index) => ({
  id: `card-${letter}`,
  title: `Letra ${letter}`,
  value: letter,
  type: letter.match(/[AEIOU]/) ? 'vocal' : 'consonante',
  color: colors[index % colors.length],
  icon: PICTOGRAMS[letter].icon,
  monster: '👾', // Gumi
  description: `${letter} de ${PICTOGRAMS[letter].word}`,
  audioInstruction: `${letter} de ${PICTOGRAMS[letter].word}`
}));

// Añadir sílabas al final del camino
['BA', 'BE', 'BI', 'BO', 'BU', 'MA', 'ME', 'MI', 'MO', 'MU'].forEach((syllable, index) => {
  MAGIC_PATH.push({
    id: `syllable-${syllable}`,
    title: `Sílaba ${syllable}`,
    value: syllable,
    type: 'silaba',
    color: colors[(index + 5) % colors.length],
    icon: '✨',
    monster: '👾',
    description: `Sílaba ${syllable}`,
    audioInstruction: `${syllable}`
  });
});
