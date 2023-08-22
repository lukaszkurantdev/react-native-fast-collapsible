import React, { type ReactNode } from 'react';
import { useCollapsible } from '../useCollapsible';
import Animated from 'react-native-reanimated';

import { collapsibleStyles } from './Collapsible.styles';
import type { CollapsibleConfig } from 'src/types';

export type CollapsibleProps = CollapsibleConfig & {
  children?: ReactNode;
};

export function Collapsible(props: CollapsibleProps) {
  const { children, isVisible } = props;

  const { animatedStyles, onLayout } = useCollapsible(props);

  return (
    <Animated.View
      style={[animatedStyles, collapsibleStyles.overflowHidden]}
      pointerEvents={isVisible ? 'auto' : 'none'}
    >
      <Animated.View onLayout={onLayout} style={collapsibleStyles.container}>
        {children}
      </Animated.View>
    </Animated.View>
  );
}
