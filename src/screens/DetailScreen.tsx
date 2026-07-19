import React from 'react';
import {Image, Modal, Pressable, ScrollView, Text, useWindowDimensions, View} from 'react-native';
import {ScreenSafeArea} from '../components/ScreenSafeArea';
import type {ContentItem} from '../data';
import {styles} from '../styles';

type Props = {
  item: ContentItem | null;
  actionLabel: string;
  onClose: () => void;
  onAction: () => void;
};

export function DetailScreen({item, actionLabel, onClose, onAction}: Props) {
  const {width} = useWindowDimensions();

  if (!item) {
    return null;
  }

  return (
    <Modal visible transparent animationType="slide" onRequestClose={onClose}>
      <ScreenSafeArea style={styles.detailModal}>
        <Pressable style={styles.closeButton} onPress={onClose} accessibilityLabel="Close details">
          <Text style={styles.closeButtonText}>×</Text>
        </Pressable>
        <ScrollView contentContainerStyle={styles.detailScroll}>
          <Image source={item.image} style={[styles.detailImage, {width}]} />
          <Text style={styles.detailCategory}>{item.category}</Text>
          <Text style={styles.detailTitle}>{item.title}</Text>
          <Text style={styles.detailMeta}>{item.meta}</Text>
          <View style={styles.detailRule} />
          <Text style={styles.detailDescription}>{item.description}</Text>
          <Text style={styles.detailDescription}>
            Availability and service details may vary. Contact the support team if you need more information.
          </Text>
          <Pressable style={styles.fullButton} onPress={onAction}>
            <Text style={styles.primaryButtonText}>{actionLabel}</Text>
            <Text style={styles.buttonArrow}>→</Text>
          </Pressable>
        </ScrollView>
      </ScreenSafeArea>
    </Modal>
  );
}
