import React, {useState} from 'react';
import {ImageBackground, Pressable, StatusBar, Text, useWindowDimensions, View} from 'react-native';
import {Brand} from '../components/Brand';
import {ScreenSafeArea} from '../components/ScreenSafeArea';
import {styles} from '../styles';

const onboarding = [
  {
    image: require('../assets/playground-onboarding-lobby.png'),
    eyebrow: 'PLAYGROUND RESORT INFORMATION',
    title: 'Information for\nyour stay',
    text: 'View resort information and access available services during your stay.',
  },
  {
    image: require('../assets/playground-onboarding-reception.png'),
    eyebrow: 'ACTIVITIES',
    title: 'View daily\nactivities',
    text: 'View scheduled wellness sessions, entertainment, and other activities.',
  },
  {
    image: require('../assets/playground-onboarding-restaurant.png'),
    eyebrow: 'RESTAURANT & ROOM SERVICE',
    title: 'View dining\noptions',
    text: 'Browse the menu and order available items for delivery to your room.',
  },
  {
    image: require('../assets/playground-onboarding-jazz-evening.png'),
    eyebrow: 'INFORMATION AND SERVICES',
    title: 'Resort services\nin one place',
    text: 'Access activities, dining, room service, and resort information.',
  },
];

export function OnboardingScreen({onComplete}: {onComplete: () => void}) {
  const {height, width} = useWindowDimensions();
  const [page, setPage] = useState(0);
  const item = onboarding[page];
  const isLast = page === onboarding.length - 1;
  const compact = height < 700 || width < 360;

  return (
    <ImageBackground source={item.image} style={styles.onboardingImage} resizeMode="cover">
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View style={styles.onboardingShade} />
      <ScreenSafeArea style={styles.fill}>
        <View style={styles.onboardingTop}>
          <Brand compact />
          {!isLast && (
            <Pressable accessibilityRole="button" onPress={onComplete} hitSlop={12}>
              <Text style={styles.skip}>SKIP</Text>
            </Pressable>
          )}
        </View>
        <View style={[styles.onboardingCopy, compact && styles.onboardingCopyCompact]}>
          <Text style={styles.eyebrow}>{item.eyebrow}</Text>
          <Text style={[styles.onboardingTitle, compact && styles.onboardingTitleCompact]}>{item.title}</Text>
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
      </ScreenSafeArea>
    </ImageBackground>
  );
}
