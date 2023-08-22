import type Animated from 'react-native-reanimated';

export type CollapsibleConfig = {
  heightOffset?: number;
  duration?: number;
  easing?: Animated.EasingFunction;
  isVisible: boolean;
};
