import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { ChallengeBox } from '../components/ChallengeBox';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';

import styles from '../styles/pages/Home.module.css'

interface HomeProps {
  level: number;
  experienciaAtual: number;
  desafiosCompletos: number;
}

export default function Home(props) {
  return (
    <ChallengesProvider 
      level={props.level} 
      experienciaAtual={props.experienciaAtual} 
      desafiosCompletos={props.desafiosCompletos}
    >
      <div className={styles.container}>
        <Head>
          <title>Inicio | NLW04</title>
        </Head>
        
        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  
  const { level, experienciaAtual, desafiosCompletos } = ctx.req.cookies;
  
  return {
    props: {
      level: Number(level),
      experienciaAtual: Number(experienciaAtual),
      desafiosCompletos: Number(desafiosCompletos)
    }
  }
}

