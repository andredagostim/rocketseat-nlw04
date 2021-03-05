import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengerContextData {
  level: number;
  experienciaAtual: number;
  experienciaProximoNivel: number;
  desafiosCompletos: number;
  activeChallenge: Challenge;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  experienciaAtual: number;
  desafiosCompletos: number;
}

export const ChallengesContext = createContext({} as ChallengerContextData);

export function ChallengesProvider({ 
  children, 
  ...rest
}: ChallengesProviderProps) {

  const [level, setLevel] = useState(rest.level ?? 1);
  const [experienciaAtual, setExperienciaAtual] = useState(rest.experienciaAtual ?? 0);
  const [desafiosCompletos, setDesafiosCompletos] = useState(rest.desafiosCompletos ?? 0);

  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienciaProximoNivel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, [])

  useEffect(() => {
  Cookies.set('level', String(level))
  Cookies.set('experienciaAtual', String(experienciaAtual))
  Cookies.set('desafiosCompletos', String(desafiosCompletos))
}, [level, experienciaAtual, desafiosCompletos])

  function levelUp(){
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if(Notification.permission === 'granted'){
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount}xp!`
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if(!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = experienciaAtual + amount;

    if (finalExperience >= experienciaProximoNivel) {
      levelUp();
      finalExperience = finalExperience - experienciaProximoNivel;
    }

    setExperienciaAtual(finalExperience);
    setActiveChallenge(null);
    setDesafiosCompletos(desafiosCompletos + 1);
  }
 
  return (
    <ChallengesContext.Provider
      value={{ 
        level, 
        experienciaAtual,
        experienciaProximoNivel, 
        desafiosCompletos,
        activeChallenge,
        levelUp,
        startNewChallenge,
        resetChallenge,
        completeChallenge,
      }}
    >
      { children }
    </ChallengesContext.Provider>
  );
}