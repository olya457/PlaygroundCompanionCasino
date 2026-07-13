import React, {useState} from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import {BottomTabs} from '../components/BottomTabs';
import {styles} from '../styles';
import {colors} from '../theme';
import type {MainTab} from '../types';
import {ClimateScreen} from './ClimateScreen';
import {EventsScreen} from './EventsScreen';
import {HomeScreen} from './HomeScreen';
import {MenuScreen} from './MenuScreen';
import {TaxiScreen} from './TaxiScreen';

export function MainScreen() {
  const [tab, setTab] = useState<MainTab>('home');

  return (
    <SafeAreaView style={styles.appSafe}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <View style={styles.mainContent}>
        {tab === 'home' && <HomeScreen onNavigate={setTab} />}
        {tab === 'events' && <EventsScreen />}
        {tab === 'menu' && <MenuScreen />}
        {tab === 'climate' && <ClimateScreen />}
        {tab === 'taxi' && <TaxiScreen />}
      </View>
      <BottomTabs tab={tab} onChange={setTab} />
    </SafeAreaView>
  );
}
