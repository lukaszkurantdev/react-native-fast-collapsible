![Title](https://github.com/user-attachments/assets/f67703be-637d-4ae5-9508-c421f16db62f)

Pure Javascript library for React Native with super-fast collapsible component using Reanimated API. It works with Expo.

- 🎙️ Works with Expo
- 🪽 Easy usage
- ⚠️ `react-native-reanimated` required

### Motivation

There are currently many libraries available for Collapsible components, but they are either no longer supported or do not implement the latest innovations in the React Native architecture. Hence the need for a library that works with the new architecture based on the React Native Reanimated API V3 and allow to have always native performance.

### Installation

```sh
yarn add react-native-fast-collapsible
```

This library has a peer dependency on react-native-reanimated has to be installed, linked and configured into your project. Follow [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started) to install the dependency.

### Usage / API

#### Collapsible component

A simple component that enables an animated action to hide and show content.

https://github.com/user-attachments/assets/e74700c5-d1b9-4559-9b9b-940bd02d684f

#### Example

```jsx
import React, { useState } from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Collapsible } from 'react-native-fast-collapsible';

export default function SimpleCollapsible() {
  const [isVisible, setVisibility] = useState(false);

  const toggleVisibility = () => {
    setVisibility((previous) => !previous);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleVisibility}>
        <Text>Expand / Collapse</Text>
      </TouchableOpacity>

      <Collapsible isVisible={isVisible}>
        <Text>Lorem ipsum....</Text>
      </Collapsible>
    </View>
  );
}
```

#### Properties

| Property           | Type        | Description                                 | Default         |
| ------------------ | ----------- | ------------------------------------------- | --------------- |
| **`isVisible`**    | `boolean`   | Whether to show the child components or not | `top`           |
| **`heightOffset`** | `number`    | Offset of collapsed children visible        | `0`             |
| **`duration`**     | `number`    | Time in ms of animation                     | `300`           |
| **`easing`**       | `Easing`    | Type of animation from Reanimated           | `Easing.linear` |
| **`children`**     | `ReactNode` | Children to show or hide                    | –               |

### useCollapsible hook

Headless hook to create your own collapsible components.

https://github.com/user-attachments/assets/aef8cf7a-bbb0-4d1d-96ea-452e3e3be2f2

#### Example

```jsx
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
        <View onLayout={onLayout} style={styles.collapsibleContainer}>
          <Text>Lorem ipsum...</Text>
        </View>
      </Animated.View>
    </View>
  );
}
```

#### Config object options

| Property           | Type      | Description                                 | Default         |
| ------------------ | --------- | ------------------------------------------- | --------------- |
| **`isVisible`**    | `boolean` | Whether to show the child components or not | `top`           |
| **`heightOffset`** | `number`  | Offset of collapsed children visible        | `0`             |
| **`duration`**     | `number`  | Time in ms of animation                     | `300`           |
| **`easing`**       | `Easing`  | Type of animation from Reanimated           | `Easing.linear` |

#### Hook returned object

| Property             | Type                                 | Description                                    |
| -------------------- | ------------------------------------ | ---------------------------------------------- |
| **`onLayout`**       | `(event: LayoutChangeEvent) => void` | Function need to be used on children container |
| **`height`**         | `SharedValue<number>`                | Reanimated shared value with current height    |
| **`animatedStyles`** | `number`                             | Styles of children container                   |
| **`maxHeight`**      | `number`                             | Children max height                            |

### Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT © 2023-2024 Lukasz Kurant
