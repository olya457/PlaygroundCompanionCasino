import React from 'react';
import {Image, Text, View} from 'react-native';
import {styles} from '../styles';

export function Brand({compact = false}: {compact?: boolean}) {
  return (
    <View style={styles.brandRow}>
      <Image source={require('../assets/playground-brand-logo.png')} style={compact ? styles.brandLogoSmall : styles.brandLogo} />
      <View>
        <Text style={compact ? styles.brandNameSmall : styles.brandName}>Playground</Text>
        <Text style={compact ? styles.brandSubSmall : styles.brandSub}>RESORT</Text>
      </View>
    </View>
  );
}
