import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {styles} from '../styles';

type Props = {label: string; value: string; placeholder: string; onPress: () => void};

export function SelectField({label, value, placeholder, onPress}: Props) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Pressable style={styles.selectField} onPress={onPress} accessibilityRole="button">
        <Text style={value ? styles.selectValue : styles.selectPlaceholder}>{value || placeholder}</Text>
        <Text style={styles.chevron}>⌄</Text>
      </Pressable>
    </View>
  );
}
