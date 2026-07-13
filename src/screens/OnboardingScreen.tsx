import React, {useState} from 'react';
import {ImageBackground, Pressable, SafeAreaView, StatusBar, Text, View} from 'react-native';
import {Brand} from '../components/Brand';
import {styles} from '../styles';

const onboarding = [
  {
    image: require('../assets/playground-onboarding-lobby.png'),
    eyebrow: 'WELCOME TO PLAYGROUND RESORT',
    title: 'A stay designed\naround you',
    text: 'Your personal companion for a seamless and unforgettable resort experience.',
  },
  {
    image: require('../assets/playground-onboarding-reception.png'),
    eyebrow: 'PERSONAL CONCIERGE',
    title: 'Discover daily\nexperiences',
    text: 'Explore wellness sessions, live entertainment, and memorable activities every day.',
  },
  {
    image: require('../assets/playground-onboarding-restaurant.png'),
    eyebrow: 'RESTAURANT & ROOM SERVICE',
    title: 'Order food\nanytime',
    text: 'Browse restaurant favorites and have them delivered straight to your room.',
  },
  {
    image: require('../assets/playground-onboarding-jazz-evening.png'),
    eyebrow: 'EVERYTHING IN ONE PLACE',
    title: 'Everything\nyou need',
    text: 'Events, dining, room service, and resort information — all at your fingertips.',
  },
];

export function OnboardingScreen({onComplete}: {onComplete: () => void}) {
  const [page, setPage] = useState(0);
  const item = onboarding[page];
  const isLast = page === onboarding.length - 1;

  return (
    <ImageBackground source={item.image} style={styles.onboardingImage} resizeMode="cover">
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View style={styles.onboardingShade} />
      <SafeAreaView style={styles.fill}>
        <View style={styles.onboardingTop}>
          <Brand compact />
          {!isLast && (
            <Pressable accessibilityRole="button" onPress={onComplete} hitSlop={12}>
              <Text style={styles.skip}>SKIP</Text>
            </Pressable>
          )}
        </View>
        <View style={styles.onboardingCopy}>
          <Text style={styles.eyebrow}>{item.eyebrow}</Text>
          <Text style={styles.onboardingTitle}>{item.title}</Text>
          <Text style={styles.onboardingText}>{item.text}</Text>
          <View style={styles.onboardingFooter}>
            <View style={styles.dots}>
              {onboarding.map((_, index) => (
                <View key={index} style={[styles.dot, index === page && styles.dotActive]} />
              ))}
            </View>
            <Pressable
              accessibilityRole="button"
              style={({pressed}) => [styles.primaryButton, pressed && styles.buttonPressed]}
              onPress={() => (isLast ? onComplete() : setPage(value => value + 1))}>
              <Text style={styles.primaryButtonText}>{isLast ? 'GET STARTED' : 'NEXT'}</Text>
              <Text style={styles.buttonArrow}>→</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
