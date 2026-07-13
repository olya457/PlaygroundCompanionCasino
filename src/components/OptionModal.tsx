import React from 'react';
import {Modal, Pressable, ScrollView, Text, View} from 'react-native';
import {styles} from '../styles';

type Props = {
  visible: boolean;
  title: string;
  options: string[];
  selected: string;
  onClose: () => void;
  onChoose: (value: string) => void;
};

export function OptionModal({visible, title, options, selected, onClose, onChoose}: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.modalBackdrop} onPress={onClose}>
        <Pressable style={styles.optionSheet} onPress={() => undefined}>
          <View style={styles.sheetHandle} />
          <Text style={styles.modalTitle}>{title}</Text>
          <ScrollView style={styles.optionList} showsVerticalScrollIndicator={false}>
            {options.map(option => (
              <Pressable key={option} style={styles.optionRow} onPress={() => onChoose(option)}>
                <Text style={[styles.optionText, option === selected && styles.optionTextActive]}>{option}</Text>
                <View style={[styles.radio, option === selected && styles.radioActive]}>
                  {option === selected ? <View style={styles.radioDot} /> : null}
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
