import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {styles} from '../styles';
import {Brand} from './Brand';

export function Header({title}: {title?: string}) {
  return (
    <View style={styles.header}>
      <Brand compact />
      {title ? <Text style={styles.headerTitle}>{title}</Text> : null}
      <Pressable style={styles.avatar} accessibilityLabel="Guest profile">
        <Text style={styles.avatarText}>G</Text>
      </Pressable>
    </View>
  );
}
