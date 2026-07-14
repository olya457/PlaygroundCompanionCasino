import React, {useMemo, useState} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import {ConfirmationModal} from '../components/ConfirmationModal';
import {OptionModal} from '../components/OptionModal';
import {styles} from '../styles';

const vehicleTypes = ['ECONOMY', 'BUSINESS', 'SUV', 'VAN'] as const;
type VehicleType = (typeof vehicleTypes)[number];
type Picker = 'pickup' | 'destination' | 'date' | 'time';

const locations = [
  {name: 'Playground Resort', address: 'Main hotel entrance', x: 0, y: 0},
  {name: 'Vancouver International Airport', address: 'Departures terminal', x: 7.6, y: 4.1},
  {name: 'Downtown Vancouver', address: 'Canada Place', x: 5.4, y: 2.8},
  {name: 'Central Station', address: 'Pacific Central Station', x: 4.2, y: 3.1},
  {name: 'Maple Ridge Golf Club', address: 'Clubhouse entrance', x: -2.4, y: 2.1},
  {name: 'Lakeside Spa', address: 'West lake entrance', x: -1.2, y: 1.1},
];

const vehiclePricing: Record<VehicleType, {base: number; perKm: number}> = {
  ECONOMY: {base: 5, perKm: 1.35},
  BUSINESS: {base: 9, perKm: 1.8},
  SUV: {base: 11, perKm: 2.15},
  VAN: {base: 13, perKm: 2.4},
};

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const dateOptions = Array.from({length: 14}, (_, index) => {
  const date = new Date();
  date.setDate(date.getDate() + index);
  const prefix = index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : dayNames[date.getDay()];
  return `${prefix} · ${monthNames[date.getMonth()]} ${date.getDate()}`;
});
const timeOptions = Array.from({length: 48}, (_, index) => {
  const hours = Math.floor(index / 2).toString().padStart(2, '0');
  return `${hours}:${index % 2 === 0 ? '00' : '30'}`;
});

export function TaxiScreen() {
  const [vehicle, setVehicle] = useState<VehicleType>('BUSINESS');
  const [pickupMode, setPickupMode] = useState<'NOW' | 'SCHEDULE'>('NOW');
  const [pickup, setPickup] = useState('Playground Resort');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [picker, setPicker] = useState<Picker | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const pickupLocation = locations.find(item => item.name === pickup) ?? locations[0];
  const destinationLocation = locations.find(item => item.name === destination);

  const estimate = useMemo(() => {
    if (!destinationLocation) {
      return null;
    }
    const rawDistance = Math.hypot(
      destinationLocation.x - pickupLocation.x,
      destinationLocation.y - pickupLocation.y,
    );
    const distance = Math.max(1.2, rawDistance * 2.15);
    const duration = Math.ceil(distance / 0.55 + 4);
    const pricing = vehiclePricing[vehicle];
    const price = pricing.base + distance * pricing.perKm;
    return {distance, duration, price};
  }, [destinationLocation, pickupLocation, vehicle]);

  const pickerOptions = picker === 'pickup'
    ? locations.map(item => item.name).filter(item => item !== destination)
    : picker === 'destination'
      ? locations.map(item => item.name).filter(item => item !== pickup)
      : picker === 'date'
        ? dateOptions
        : timeOptions;

  const pickerValue = picker === 'pickup'
    ? pickup
    : picker === 'destination'
      ? destination
      : picker === 'date'
        ? date
        : time;

  const chooseOption = (value: string) => {
    if (picker === 'pickup') {
      setPickup(value);
    } else if (picker === 'destination') {
      setDestination(value);
    } else if (picker === 'date') {
      setDate(value);
      setPickupMode('SCHEDULE');
    } else {
      setTime(value);
      setPickupMode('SCHEDULE');
    }
    setPicker(null);
  };

  const requestDisabled = !estimate || (pickupMode === 'SCHEDULE' && (!date || !time));

  return (
    <>
      <ScrollView contentContainerStyle={styles.controlScroll} showsVerticalScrollIndicator={false}>
        <View style={styles.controlHeader}>
          <Text style={styles.controlTitle}>Taxi Booking</Text>
          <Text style={styles.controlKicker}>RESORT TRANSPORTATION</Text>
        </View>

        <View style={styles.controlSection}>
          <Text style={styles.controlLabel}>YOUR ROUTE</Text>
          <Text style={styles.taxiPickupLabel}>PICKUP LOCATION</Text>
          <Pressable style={styles.locationSelect} onPress={() => setPicker('pickup')}>
            <View style={styles.locationSelectCopy}>
              <Text style={styles.controlSelectValue}>{pickup}</Text>
              <Text style={styles.locationAddress}>{pickupLocation.address}</Text>
            </View>
            <Text style={styles.controlSelectArrow}>⌄</Text>
          </Pressable>

          <Text style={styles.taxiDestinationLabel}>DESTINATION</Text>
          <Pressable style={styles.locationSelect} onPress={() => setPicker('destination')}>
            <View style={styles.locationSelectCopy}>
              <Text style={destination ? styles.controlSelectValue : styles.controlSelectPlaceholder}>
                {destination || 'Choose where to go'}
              </Text>
              {destinationLocation ? <Text style={styles.locationAddress}>{destinationLocation.address}</Text> : null}
            </View>
            <Text style={styles.controlSelectArrow}>⌄</Text>
          </Pressable>
        </View>

        {destinationLocation && estimate ? (
          <View style={styles.routeCard}>
            <Text style={styles.controlLabel}>APPROXIMATE ROUTE</Text>
            <View style={styles.routeStop}>
              <View style={styles.routeStartDot} />
              <View style={styles.routeStopCopy}>
                <Text style={styles.routeStopName}>{pickup}</Text>
                <Text style={styles.locationAddress}>{pickupLocation.address}</Text>
              </View>
            </View>
            <View style={styles.routeLine} />
            <View style={styles.routeStop}>
              <View style={styles.routeEndDot} />
              <View style={styles.routeStopCopy}>
                <Text style={styles.routeStopName}>{destination}</Text>
                <Text style={styles.locationAddress}>{destinationLocation.address}</Text>
              </View>
            </View>
            <View style={styles.routeSummary}>
              <Text style={styles.routeSummaryText}>{estimate.distance.toFixed(1)} km</Text>
              <Text style={styles.routeSummarySeparator}>·</Text>
              <Text style={styles.routeSummaryText}>about {estimate.duration} min</Text>
              <Text style={styles.routePrice}>CA${estimate.price.toFixed(2)}</Text>
            </View>
          </View>
        ) : null}

        <View style={styles.controlSection}>
          <Text style={styles.controlLabel}>VEHICLE TYPE</Text>
          <View style={styles.segmentRow}>
            {vehicleTypes.map(item => (
              <Pressable
                key={item}
                style={[styles.segmentButton, item === vehicle && styles.segmentButtonActive]}
                onPress={() => setVehicle(item)}>
                <Text style={[styles.segmentText, item === vehicle && styles.segmentTextActive]}>{item}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.estimateSection}>
          <View style={styles.estimateCard}>
            <Text style={styles.controlLabel}>TRIP TIME</Text>
            <Text style={styles.estimateValue}>{estimate ? `${estimate.duration} min` : '—'}</Text>
          </View>
          <View style={styles.estimateCard}>
            <Text style={styles.controlLabel}>DISTANCE</Text>
            <View style={styles.priceRow}>
              <Text style={styles.priceValue}>{estimate ? estimate.distance.toFixed(1) : '—'}</Text>
              <Text style={styles.controlMuted}> km</Text>
            </View>
          </View>
        </View>

        <View style={styles.controlSection}>
          <Text style={styles.controlLabel}>PICKUP</Text>
          <View style={styles.segmentRow}>
            {(['NOW', 'SCHEDULE'] as const).map(item => (
              <Pressable
                key={item}
                style={[styles.segmentButton, item === pickupMode && styles.segmentButtonActive]}
                onPress={() => setPickupMode(item)}>
                <Text style={[styles.segmentText, item === pickupMode && styles.segmentTextActive]}>{item}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.taxiDateSection}>
          <View style={styles.fieldRow}>
            <View style={styles.fieldHalf}>
              <Text style={styles.fieldLabel}>DATE</Text>
              <Pressable style={styles.controlSelect} onPress={() => setPicker('date')}>
                <Text style={pickupMode === 'NOW' || date ? styles.controlSelectValue : styles.controlSelectPlaceholder}>
                  {pickupMode === 'NOW' ? 'Today' : date || 'Select date'}
                </Text>
                <Text style={styles.controlSelectArrow}>⌄</Text>
              </Pressable>
            </View>
            <View style={styles.fieldHalf}>
              <Text style={styles.fieldLabel}>TIME</Text>
              <Pressable style={styles.controlSelect} onPress={() => setPicker('time')}>
                <Text style={pickupMode === 'NOW' || time ? styles.controlSelectValue : styles.controlSelectPlaceholder}>
                  {pickupMode === 'NOW' ? 'As soon as possible' : time || 'Select time'}
                </Text>
                <Text style={styles.controlSelectArrow}>⌄</Text>
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.controlActionSection}>
          <Pressable
            disabled={requestDisabled}
            style={({pressed}) => [
              styles.controlActionButton,
              requestDisabled && styles.controlActionButtonDisabled,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => setConfirmed(true)}>
            <Text style={styles.controlActionText}>REQUEST TAXI</Text>
          </Pressable>
          {requestDisabled ? (
            <Text style={styles.taxiHint}>
              {!estimate ? 'Choose a destination to calculate the trip.' : 'Select a date and time for the scheduled pickup.'}
            </Text>
          ) : null}
        </View>
      </ScrollView>

      <OptionModal
        visible={picker !== null}
        title={picker === 'pickup' ? 'Select pickup location' : picker === 'destination' ? 'Select destination' : picker === 'date' ? 'Select date' : 'Select time'}
        options={pickerOptions}
        selected={pickerValue}
        onClose={() => setPicker(null)}
        onChoose={chooseOption}
      />

      <ConfirmationModal
        visible={confirmed}
        title="Taxi requested"
        message={estimate ? `${vehicle.toLowerCase()} car from ${pickup} to ${destination}.\n${pickupMode === 'NOW' ? 'Pickup as soon as possible' : `${date} at ${time}`} · ${estimate.distance.toFixed(1)} km · about ${estimate.duration} min · CA$${estimate.price.toFixed(2)}.` : ''}
        onClose={() => setConfirmed(false)}
      />
    </>
  );
}
