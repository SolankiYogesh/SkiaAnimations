import React, {useEffect} from 'react';
import {
  LinearGradient,
  RoundedRect,
  interpolateColors,
  vec,
} from '@shopify/react-native-skia';
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Constant from '@/Helpers/Constant';

const startColors = ['#9796f0', '#fbc7d4', '#2980B9', '#6DD5FA', '#FFFFFF'];
const endColors = ['#E100FF', '#c471ed', '#8E2DE2', '#12c2e9', '#4A00E0'];

export default () => {
  const animatedValue = useSharedValue(0);
  useEffect(() => {
    animatedValue.value = withRepeat(
      withTiming(startColors.length - 1, {
        duration: 5000,
        easing: Easing.linear,
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
    ];
  });

  return (
    <RoundedRect
      height={Constant.HEIGHT}
      width={Constant.WIDTH}
      r={50}
      x={Constant.MARGIN}
      y={0}
      color={'#4B70F5'}>
      <LinearGradient
        start={vec(0, 0)}
        end={vec(Constant.WIDTH, Constant.HEIGHT)}
        colors={gradientColors}
      />
    </RoundedRect>
  );
};
