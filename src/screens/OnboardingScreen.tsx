import React, {useState} from 'react';
import {ImageBackground, Pressable, StatusBar, Text, useWindowDimensions, View} from 'react-native';
import {Brand} from '../components/Brand';
import {ScreenSafeArea} from '../components/ScreenSafeArea';
import {styles} from '../styles';

const onboarding = [
  {
    image: require('../assets/harbor-stay-onboarding-lobby.png'),
    eyebrow: 'HARBOR STAY COMPANION',
    title: 'Useful details for\nyour visit',
    text: 'Find practical information and access available services in one place.',
  },
  {
    image: require('../assets/harbor-stay-onboarding-reception.png'),
    eyebrow: 'ACTIVITIES',
    title: 'View daily\nactivities',
    text: 'Browse scheduled wellness sessions, local experiences, and other activities.',
  },
  {
    image: require('../assets/harbor-stay-onboarding-restaurant.png'),
    eyebrow: 'DINING OPTIONS',
    title: 'View dining\noptions',
    text: 'Browse available menus and choose items for convenient delivery.',
  },
  {
    image: require('../assets/harbor-stay-onboarding-jazz-evening.png'),
    eyebrow: 'INFORMATION AND SERVICES',
    title: 'Everyday services\nin one place',
    text: 'Access activities, dining options, climate controls, and transportation details.',
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
