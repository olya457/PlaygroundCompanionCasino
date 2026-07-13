import React, {useState} from 'react';
import {MainScreen} from './src/screens/MainScreen';
import {OnboardingScreen} from './src/screens/OnboardingScreen';
import {SplashScreen} from './src/screens/SplashScreen';
import type {AppScreen} from './src/types';

export default function App(): React.JSX.Element {
  const [screen, setScreen] = useState<AppScreen>('splash');

  if (screen === 'splash') {
    return <SplashScreen onDone={() => setScreen('onboarding')} />;
  }

  if (screen === 'onboarding') {
    return <OnboardingScreen onComplete={() => setScreen('main')} />;
  }

  return <MainScreen />;
}
