import React, {useEffect} from 'react';
import {
  Canvas,
  LinearGradient,
  Rect,
  interpolateColors,
  vec,
} from '@shopify/react-native-skia';
import CommonStyle from '@/Theme/CommonStyle';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '@/Helpers/Measurements';
import {
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const startColors = [
  '#E100FF',
  '#c471ed',
  '#8E2DE2',
  '#12c2e9',
  '#4A00E0',
  '#FF0000', // Red
  '#FF7F00', // Orange
  '#FFFF00', // Yellow
  '#7FFF00', // Chartreuse
  '#00FF00', // Lime
  '#00FF7F', // Spring Green
  '#00FFFF', // Cyan
  '#007FFF', // Azure
  '#0000FF', // Blue
  '#7F00FF', // Violet
  '#FF00FF', // Magenta
  '#FF007F', // Rose
  '#FF6666', // Light Red
  '#FFD700', // Gold
  '#32CD32', // Lime Green
  '#4682B4',
]; // Steel Blue];
const endColors = startColors.reverse();

export default () => {
  const animatedValue = useSharedValue(0);
  useEffect(() => {
    animatedValue.value = withRepeat(
      withTiming(startColors.length - 1, {
        duration: 5000,
      }),
      -1,
      true,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const gradientColors = useDerivedValue(() => {
    return [
      interpolateColors(animatedValue.value, [0, 1, 2, 3], startColors),
      interpolateColors(animatedValue.value, [0, 1, 2, 3], endColors),
      interpolateColors(animatedValue.value, [0, 1, 2, 3], startColors),
      interpolateColors(animatedValue.value, [0, 1, 2, 3], endColors),
    ];
  });

  return (
    <Canvas style={CommonStyle.flex}>
      <Rect
        height={SCREEN_HEIGHT}
        width={SCREEN_WIDTH}
        x={0}
        y={0}
        color={'#4B70F5'}>
        <LinearGradient
          start={vec(0, 0)}
          end={vec(SCREEN_WIDTH, SCREEN_HEIGHT)}
          colors={gradientColors}
        />
      </Rect>
    </Canvas>
  );
};
