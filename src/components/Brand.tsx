import React from 'react';
import {Image, Text, View} from 'react-native';
import {styles} from '../styles';

export function Brand({compact = false}: {compact?: boolean}) {
  return (
    <View style={styles.brandRow}>
      <Image source={require('../assets/resort-stay-brand-logo.png')} style={compact ? styles.brandLogoSmall : styles.brandLogo} />
      <View>
        <Text style={compact ? styles.brandNameSmall : styles.brandName}>Hotel Guest Hub</Text>
      </View>
    </View>
  );
}
