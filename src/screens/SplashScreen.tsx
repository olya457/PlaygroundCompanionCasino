import React, {useEffect, useRef} from 'react';
import {Animated, Image, ImageBackground, StatusBar, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {styles} from '../styles';

const splashHtml = `<!doctype html>
<html><head><meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
html,body{margin:0;background:transparent;height:100%;overflow:hidden}
.scene{height:100%;display:flex;align-items:center;justify-content:center}
.spinner{width:24px;height:24px;border-radius:50%;border:4px solid rgba(176,8,15,.55);border-top-color:#e11921;animation:spin .8s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
</style></head><body><div class="scene"><div class="spinner"></div></div></body></html>`;

export function SplashScreen({onDone}: {onDone: () => void}) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {toValue: 1, duration: 700, useNativeDriver: true}).start();
    const timer = setTimeout(onDone, 4000);
    return () => clearTimeout(timer);
  }, [onDone, opacity]);

  return (
    <ImageBackground
      source={require('../assets/resort-stay-resort-exterior.png')}
      resizeMode="cover"
      style={styles.splash}>
      <StatusBar hidden />
      <View style={styles.splashShade} />
      <Animated.View style={[styles.splashContent, {opacity}]}>
        <View style={styles.splashHeadingPanel}>
          <Text style={styles.splashTitle}>{'Hotel Guest\nHub'}</Text>
          <Text style={styles.splashSubtitle}>Information and Everyday Services</Text>
        </View>
        <Image
          source={require('../assets/resort-stay-brand-logo.png')}
          style={styles.splashLogo}
        />
        <View style={styles.splashLoader}>
          <WebView
            originWhitelist={['*']}
            source={{html: splashHtml}}
            scrollEnabled={false}
            pointerEvents="none"
            style={styles.splashWebView}
            containerStyle={styles.splashWebViewContainer}
            androidLayerType="software"
          />
        </View>
      </Animated.View>
    </ImageBackground>
  );
}
