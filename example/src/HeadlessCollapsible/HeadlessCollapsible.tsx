import React, { useState } from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCollapsible } from 'react-native-fast-collapsible';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

export default function HeadlessCollapsible() {
  const [isVisible, setVisibility] = useState(false);

  const { animatedStyles, onLayout, height, maxHeight } = useCollapsible({
    isVisible,
    easing: Easing.bounce,
    duration: 1000,
  });

  const toggleVisibility = () => {
    setVisibility((previous) => !previous);
  };

  const arrowStyles = useAnimatedStyle(() => {
    const degree = interpolate(height.value, [0, maxHeight], [0, 180]);

    return {
      transform: [{ rotate: `${degree}deg` }],
    };
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={toggleVisibility}
        style={styles.buttonContainer}
      >
        <Text>Expand / Collapse</Text>
        <Animated.Text style={arrowStyles}>↓</Animated.Text>
      </TouchableOpacity>

      <Animated.View
        style={[animatedStyles, styles.overflowHidden]}
        pointerEvents={isVisible ? 'auto' : 'none'}
      >
        {/* @ts-ignore */}
        <View onLayout={onLayout} style={styles.collapsibleContainer}>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </View>
      </Animated.View>

      <Text>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    rowGap: 20,
  },
  overflowHidden: {
    overflow: 'hidden',
  },
  collapsibleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  buttonContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
