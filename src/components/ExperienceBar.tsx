import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css'

export function ExperienceBar() {
  const { experienciaAtual, experienciaProximoNivel } = useContext(ChallengesContext);

  const percertToNextLevel = Math.round(experienciaAtual * 100) / experienciaProximoNivel

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: `${percertToNextLevel}%` }}></div>
        <span className={styles.experienciaAtual} style={{ left: `${percertToNextLevel}%`}}>
          {experienciaAtual} xp
        </span>
      </div>
      <span>{experienciaProximoNivel} xp</span>
    </header>
  );
}