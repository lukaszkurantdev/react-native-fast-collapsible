import { useCallback, useEffect, useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { type CollapsibleConfig } from './types';

export function useCollapsible({
  isVisible,
  heightOffset = 0,
  duration = 300,
  easing = Easing.linear,
}: CollapsibleConfig) {
  const [componentHeight, setComponentHeight] = useState(0);
  const height = useSharedValue(heightOffset);

  useEffect(() => {
    cancelAnimation(height);
    if (isVisible) {
      height.value = withTiming(componentHeight, { duration, easing });
    } else {
      height.value = withTiming(heightOffset, { duration, easing });
    }
  }, [componentHeight, height, duration, heightOffset, isVisible, easing]);

  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const measuredHeight = event.nativeEvent.layout.height;

      if (Math.round(componentHeight) !== Math.round(measuredHeight)) {
        setComponentHeight(measuredHeight);
      }
    },
    [componentHeight]
  );

  const animatedStyles = useAnimatedStyle(() => ({ height: height.value }));

  return {
    onLayout,
    height,
    animatedStyles,
    maxHeight: componentHeight,
  };
}
