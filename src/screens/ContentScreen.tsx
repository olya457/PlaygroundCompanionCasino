import React, {useMemo, useState} from 'react';
import {Image, Pressable, ScrollView, Text, View} from 'react-native';
import {ConfirmationModal} from '../components/ConfirmationModal';
import {Header} from '../components/Header';
import type {ContentItem} from '../data';
import {styles} from '../styles';
import {DetailScreen} from './DetailScreen';

type Props = {
  kind: 'events' | 'menu';
  items: ContentItem[];
};

export function ContentScreen({kind, items}: Props) {
  const categories = useMemo(() => ['ALL', ...Array.from(new Set(items.map(item => item.category)))], [items]);
  const [category, setCategory] = useState('ALL');
  const [selected, setSelected] = useState<ContentItem | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const visibleItems = category === 'ALL' ? items : items.filter(item => item.category === category);

  return (
    <>
      <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
        <Header title={kind === 'events' ? 'Activities' : 'Dining'} />
        <Text style={styles.pageEyebrow}>{kind === 'events' ? 'AVAILABLE DURING YOUR STAY' : 'MENU'}</Text>
        <Text style={styles.pageTitle}>{kind === 'events' ? 'Activities and\nevents.' : 'Food and\ndrinks.'}</Text>
        <Text style={styles.pageLead}>
          {kind === 'events'
            ? 'Browse wellness sessions, local experiences, and scheduled activities.'
            : 'Browse breakfast, lunch, dinner, desserts, and drinks available for delivery.'}
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {categories.map(item => (
            <Pressable key={item} onPress={() => setCategory(item)} style={[styles.chip, item === category && styles.chipActive]}>
              <Text style={[styles.chipText, item === category && styles.chipTextActive]}>{item}</Text>
            </Pressable>
          ))}
        </ScrollView>
        <View style={styles.cardList}>
          {visibleItems.map(item => (
            <Pressable key={item.id} style={styles.contentCard} onPress={() => setSelected(item)}>
              <Image source={item.image} style={styles.cardImage} />
              <View style={styles.cardCopy}>
                <View style={styles.cardTopLine}>
                  <Text style={styles.cardCategory}>{item.category}</Text>
                  <Text style={styles.cardMeta}>{item.meta}</Text>
                </View>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDescription} numberOfLines={2}>{item.description}</Text>
                <View style={styles.cardLinkRow}>
                  <Text style={styles.cardLink}>{kind === 'events' ? 'VIEW DETAILS' : 'VIEW ITEM'}</Text>
                  <Text style={styles.cardLink}>→</Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <DetailScreen
        item={selected}
        actionLabel={kind === 'events' ? 'RESERVE' : 'ORDER TO MY ROOM'}
        onClose={() => setSelected(null)}
        onAction={() => {
          setSelected(null);
          setConfirmed(true);
        }}
      />
      <ConfirmationModal
        visible={confirmed}
        title={kind === 'events' ? 'Place reserved' : 'Order received'}
        message={kind === 'events' ? 'This activity has been added to your stay.' : 'Your order has been sent to the kitchen.'}
        onClose={() => setConfirmed(false)}
      />
    </>
  );
}
