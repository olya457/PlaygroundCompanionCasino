import React from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

type Props = React.PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
}>;

/**
 * React Native's built-in SafeAreaView only applies insets on iOS.
 * Android screens in this app render edge-to-edge, so reserve the status-bar
 * inset explicitly and keep the content position consistent across devices.
 */
export function ScreenSafeArea({children, style}: Props) {
  return (
    <SafeAreaView
      style={[
        style,
        Platform.OS === 'android' && {
          paddingTop: StatusBar.currentHeight ?? 0,
        },
      ]}>
      {children}
    </SafeAreaView>
  );
}
