import React from 'react';
import {Pressable, SafeAreaView, Text, View} from 'react-native';
import {styles} from '../styles';
import type {MainTab} from '../types';

const items: {id: MainTab; icon: string; label: string}[] = [
  {id: 'home', icon: '⌂', label: 'Home'},
  {id: 'events', icon: '✦', label: 'Activities'},
  {id: 'menu', icon: '⌁', label: 'Dining'},
  {id: 'climate', icon: '♨', label: 'Climate'},
  {id: 'taxi', icon: '▱', label: 'Taxi'},
];

export function BottomTabs({tab, onChange}: {tab: MainTab; onChange: (tab: MainTab) => void}) {
  return (
    <SafeAreaView style={styles.tabSafe}>
      <View style={styles.tabBar}>
        {items.map(item => (
          <Pressable key={item.id} style={styles.tabItem} onPress={() => onChange(item.id)}>
            <Text style={[styles.tabIcon, tab === item.id && styles.tabActive]}>{item.icon}</Text>
            <Text style={[styles.tabLabel, tab === item.id && styles.tabActive]}>{item.label}</Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}
