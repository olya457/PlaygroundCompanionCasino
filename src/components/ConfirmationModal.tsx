import React from 'react';
import {Modal, Pressable, Text, View} from 'react-native';
import {styles} from '../styles';

type Props = {visible: boolean; title: string; message: string; onClose: () => void};

export function ConfirmationModal({visible, title, message, onClose}: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalBackdrop}>
        <View style={styles.confirmCard}>
          <View style={styles.confirmIcon}><Text style={styles.confirmIconText}>✓</Text></View>
          <Text style={styles.confirmTitle}>{title}</Text>
          <Text style={styles.confirmText}>{message}</Text>
          <Pressable style={styles.fullButton} onPress={onClose}>
            <Text style={styles.primaryButtonText}>DONE</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
