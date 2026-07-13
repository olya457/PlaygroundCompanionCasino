import React, {useState} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import {ConfirmationModal} from '../components/ConfirmationModal';
import {OptionModal} from '../components/OptionModal';
import {styles} from '../styles';

const modes = ['COOLING', 'HEATING', 'AUTO', 'FAN'] as const;
const fanSpeeds = ['LOW', 'MEDIUM', 'HIGH'] as const;
const timeOptions = Array.from({length: 48}, (_, index) => {
  const hours = Math.floor(index / 2).toString().padStart(2, '0');
  const minutes = index % 2 === 0 ? '00' : '30';
  return `${hours}:${minutes}`;
});

export function ClimateScreen() {
  const [temperature, setTemperature] = useState(20);
  const [mode, setMode] = useState<(typeof modes)[number]>('AUTO');
  const [fanSpeed, setFanSpeed] = useState<(typeof fanSpeeds)[number]>('MEDIUM');
  const [onTime, setOnTime] = useState('');
  const [offTime, setOffTime] = useState('');
  const [timePicker, setTimePicker] = useState<'on' | 'off' | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const chooseTime = (value: string) => {
    if (timePicker === 'on') {
      setOnTime(value);
    } else {
      setOffTime(value);
    }
    setTimePicker(null);
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.controlScroll} showsVerticalScrollIndicator={false}>
        <View style={styles.controlHeader}>
          <Text style={styles.controlTitle}>Room Climate</Text>
          <Text style={styles.controlKicker}>ROOM 514</Text>
        </View>

        <View style={styles.currentTemperature}>
          <Text style={styles.controlLabel}>CURRENT TEMPERATURE</Text>
          <View style={styles.temperatureRow}>
            <Text style={styles.currentTemperatureValue}>22</Text>
            <Text style={styles.temperatureUnit}>°C</Text>
          </View>
        </View>

        <View style={styles.controlSection}>
          <Text style={styles.controlLabel}>SET TEMPERATURE</Text>
          <View style={styles.temperatureLimits}>
            <Text style={styles.controlMuted}>16°</Text>
            <Text style={styles.controlMuted}>30°</Text>
          </View>
          <View style={styles.temperatureControl}>
            <Pressable
              accessibilityLabel="Decrease temperature"
              style={styles.temperatureButton}
              onPress={() => setTemperature(value => Math.max(16, value - 1))}>
              <Text style={styles.temperatureButtonText}>−</Text>
            </Pressable>
            <Text style={styles.setTemperatureValue}>{temperature}°C</Text>
            <Pressable
              accessibilityLabel="Increase temperature"
              style={styles.temperatureButton}
              onPress={() => setTemperature(value => Math.min(30, value + 1))}>
              <Text style={styles.temperatureButtonText}>+</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.controlSection}>
          <Text style={styles.controlLabel}>MODE</Text>
          <View style={styles.segmentRow}>
            {modes.map(item => (
              <Pressable
                key={item}
                style={[styles.segmentButton, item === mode && styles.segmentButtonActive]}
                onPress={() => setMode(item)}>
                <Text style={[styles.segmentText, item === mode && styles.segmentTextActive]}>{item}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.controlSection}>
          <Text style={styles.controlLabel}>FAN SPEED</Text>
          <View style={styles.segmentRow}>
            {fanSpeeds.map(item => (
              <Pressable
                key={item}
                style={[styles.segmentButton, item === fanSpeed && styles.segmentButtonSelected]}
                onPress={() => setFanSpeed(item)}>
                <Text style={[styles.segmentText, item === fanSpeed && styles.segmentTextActive]}>{item}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.controlSection}>
          <Text style={styles.controlLabel}>TIMER</Text>
          <View style={styles.fieldRow}>
            <View style={styles.fieldHalf}>
              <Text style={styles.fieldLabel}>ON TIME</Text>
              <Pressable style={styles.controlSelect} onPress={() => setTimePicker('on')}>
                <Text style={onTime ? styles.controlSelectValue : styles.controlSelectPlaceholder}>
                  {onTime || '--:--'}
                </Text>
                <Text style={styles.controlSelectArrow}>⌄</Text>
              </Pressable>
            </View>
            <View style={styles.fieldHalf}>
              <Text style={styles.fieldLabel}>OFF TIME</Text>
              <Pressable style={styles.controlSelect} onPress={() => setTimePicker('off')}>
                <Text style={offTime ? styles.controlSelectValue : styles.controlSelectPlaceholder}>
                  {offTime || '--:--'}
                </Text>
                <Text style={styles.controlSelectArrow}>⌄</Text>
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.controlActionSection}>
          <Pressable
            style={({pressed}) => [styles.controlActionButton, pressed && styles.buttonPressed]}
            onPress={() => setConfirmed(true)}>
            <Text style={styles.controlActionText}>APPLY</Text>
          </Pressable>
        </View>
      </ScrollView>

      <OptionModal
        visible={timePicker !== null}
        title={timePicker === 'on' ? 'Select turn-on time' : 'Select turn-off time'}
        options={timeOptions}
        selected={timePicker === 'on' ? onTime : offTime}
        onClose={() => setTimePicker(null)}
        onChoose={chooseTime}
      />

      <ConfirmationModal
        visible={confirmed}
        title="Climate updated"
        message={`${temperature}°C · ${mode.toLowerCase()} · ${fanSpeed.toLowerCase()} fan`}
        onClose={() => setConfirmed(false)}
      />
    </>
  );
}
