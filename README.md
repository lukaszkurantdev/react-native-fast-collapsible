# React Native Fast Collapsible

Pure Javascript library for React Native with super-fast collapsible component using Reanimated v3 API. It works with Expo.

#### Motivation

There are currently many libraries available for Collapsible components, but they are either no longer supported or do not implement the latest innovations in the React Native architecture. Hence the need for a library that works with the new architecture based on the React Native Reanimated API V3 and allow to have always native performance.

## Prerequisites

⚠️ Peer Dependencies

- [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/)

This library has a peer dependency on react-native-reanimated has to be installed, linked and configured into your project. Follow [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started) to install the dependency.

## Installation

```sh
yarn install react-native-fast-collapsible
```

## Usage / API

### Collapsible component

A simple component that enables an animated action to hide and show content.

![Collapsible component](https://github.com/lukaszkurantdev/react-native-fast-collapsible/assets/36734207/60e3f10b-846e-43a4-8bcf-d194b8d63a45)

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

![Customized collapsible component](https://github.com/lukaszkurantdev/react-native-fast-collapsible/assets/36734207/a32318cc-3b2d-45e4-b43e-4e50d51b54da)

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

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## Maintainers

<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/oblador">
          <strong>Lukasz Kurant</strong>
        </a>
        <br>
        Author
      </td>
    </tr>
  <tbody>
</table>

## License

[MIT License](http://opensource.org/licenses/mit-license.html). © Lukasz Kurant 2023
