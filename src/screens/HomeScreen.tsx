import React, {useState} from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {ConfirmationModal} from '../components/ConfirmationModal';
import {Header} from '../components/Header';
import {OptionModal} from '../components/OptionModal';
import {SelectField} from '../components/SelectField';
import {dateOptions, roomOptions} from '../data';
import {styles} from '../styles';
import {colors} from '../theme';
import type {MainTab, PickerKind} from '../types';

export function HomeScreen({onNavigate}: {onNavigate: (tab: MainTab) => void}) {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [date, setDate] = useState('');
  const [picker, setPicker] = useState<PickerKind | null>(null);
  const [welcomeVisible, setWelcomeVisible] = useState(false);
  const pickerOptions = picker === 'room' ? roomOptions : dateOptions;

  const choose = (value: string) => {
    if (picker === 'room') {
      setRoom(value);
    } else {
      setDate(value);
    }
    setPicker(null);
  };

  return (
    <>
      <KeyboardAvoidingView style={styles.fill} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.homeScroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <Header />
          <Text style={styles.homeKicker}>STAY DETAILS</Text>
          <Text style={styles.homeGreeting}>{name.trim() ? `Stay details for ${name.trim()}` : 'Guest stay details'}</Text>
          <Text style={styles.homeLead}>Add your name, room, and date to save your stay details.</Text>

          <ImageBackground source={require('../assets/playground-resort-hero.png')} imageStyle={styles.heroImage} style={styles.heroCard}>
            <View style={styles.heroOverlay}>
              <Text style={styles.heroEyebrow}>PLAYGROUND RESORT</Text>
              <Text style={styles.heroTitle}>Resort information{'\n'}and services.</Text>
            </View>
          </ImageBackground>

          <View style={styles.formCard}>
            <View style={styles.fieldWrap}>
              <Text style={styles.fieldLabel}>YOUR NAME</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
                placeholderTextColor={colors.muted}
                style={styles.textField}
                autoCapitalize="words"
                returnKeyType="done"
              />
            </View>
            <View style={styles.fieldRow}>
              <View style={styles.fieldHalf}>
                <SelectField label="ROOM" value={room} placeholder="Select" onPress={() => setPicker('room')} />
              </View>
              <View style={styles.fieldHalf}>
                <SelectField label="DATE" value={date} placeholder="Select" onPress={() => setPicker('date')} />
              </View>
            </View>
            <Pressable
              style={({pressed}) => [styles.fullButton, pressed && styles.buttonPressed]}
              onPress={() => setWelcomeVisible(true)}>
              <Text style={styles.primaryButtonText}>SAVE MY STAY</Text>
              <Text style={styles.buttonArrow}>→</Text>
            </Pressable>
          </View>

          <Text style={styles.sectionLabel}>RESORT SERVICES</Text>
          <View style={styles.quickRow}>
            <Pressable style={styles.quickCard} onPress={() => onNavigate('events')}>
              <Text style={styles.quickIcon}>✦</Text>
              <Text style={styles.quickTitle}>Activities</Text>
              <Text style={styles.quickText}>View today's schedule</Text>
            </Pressable>
            <Pressable style={styles.quickCard} onPress={() => onNavigate('menu')}>
              <Text style={styles.quickIcon}>⌁</Text>
              <Text style={styles.quickTitle}>Dining</Text>
              <Text style={styles.quickText}>View menus and room service</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <OptionModal
        visible={picker !== null}
        title={picker === 'room' ? 'Select your room' : 'Select a date'}
        options={pickerOptions}
        selected={picker === 'room' ? room : date}
        onClose={() => setPicker(null)}
        onChoose={choose}
      />
      <ConfirmationModal
        visible={welcomeVisible}
        title="Stay details saved"
        message={room && date ? `Room ${room} · ${date}\nYour stay details are ready.` : 'You can add or change your stay details at any time.'}
        onClose={() => setWelcomeVisible(false)}
      />
    </>
  );
}
