import React from 'react';
import {
  Blur,
  Group,
  Image,
  RoundedRect,
  useImage,
} from '@shopify/react-native-skia';

import {SharedValue} from 'react-native-reanimated';

interface TabBoxProps {
  icon: any;
  size: number;
  x: number;
  isActive: boolean;
  animatedSlider: SharedValue<number>;
  width: number;
}

export default (props: TabBoxProps) => {
  const {icon, isActive, size, x, animatedSlider, width} = props;

  const image = useImage(icon);
  return (
    <Group>
      <RoundedRect
        x={animatedSlider}
        y={0}
        width={width / 2}
        height={5}
        r={32}
        color="white"
      />

      <Image
        style={'fill'}
        image={image}
        width={size}
        height={size}
        x={x}
        y={size / 2}>
        {!isActive && <Blur blur={2} />}
      </Image>
    </Group>
  );
};
