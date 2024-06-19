import {StatusBar, StyleSheet} from 'react-native';
import React from 'react';
import {
  Canvas,
  Group,
  Rect,
  RoundedRect,
  Shadow,
} from '@shopify/react-native-skia';
import CommonStyle from '@/Theme/CommonStyle';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '@/Helpers/Measurements';
import {Colors} from '@/Helpers';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {
  clamp,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const SIZE = 100;

export default () => {
  const translationX = useSharedValue(SCREEN_WIDTH / 2 - SIZE / 2);
  const translationY = useSharedValue(SCREEN_HEIGHT / 2 - SIZE / 2);
  const prevTranslationX = useSharedValue(SCREEN_WIDTH / 2 - SIZE / 2);
  const prevTranslationY = useSharedValue(SCREEN_HEIGHT / 2 - SIZE / 2);
  const rotate = useSharedValue(0);

  const pan = Gesture.Pan()
    .minDistance(1)
    .onStart(() => {
      prevTranslationX.value = translationX.value;
      prevTranslationY.value = translationY.value;
      rotate.value = withSpring(Math.PI / 4);
    })
    .onUpdate(event => {
      const maxTranslateX = SCREEN_WIDTH - SIZE;
      const maxTranslateY = SCREEN_HEIGHT - SIZE;

      translationX.value = clamp(
        prevTranslationX.value + event.translationX,
        0,
        maxTranslateX,
      );
      translationY.value = clamp(
        prevTranslationY.value + event.translationY,
        0,
        maxTranslateY,
      );
    })
    .onEnd(() => {
      rotate.value = withSpring(0);
    })
    .runOnJS(true);

  const origin = useDerivedValue(() => {
    return {
      x: translationX.value - SIZE / 2 / SIZE / 2,
      y: translationY.value - SIZE / 2 / SIZE / 2,
    };
  });

  const transform = useDerivedValue(() => {
    return [
      {
        rotate: rotate.value,
      },
    ];
  });

  return (
    <>
      <StatusBar translucent backgroundColor={Colors.transparent} />
      <GestureDetector gesture={pan}>
        <Canvas style={CommonStyle.flex}>
          <Group
            blendMode={'difference'}
            layer={
              <RoundedRect
                x={translationX}
                y={translationY}
                width={SIZE}
                origin={origin}
                height={SIZE}
                transform={transform}
                color={'white'}
                r={15}>
                <Shadow dx={5} dy={5} blur={8} color="#f4f4f4" />
                <Shadow dx={-5} dy={-5} blur={8} color="#f4f4f4" />
              </RoundedRect>
            }>
            <Rect
              x={0}
              y={0}
              width={SCREEN_WIDTH}
              color={Colors.white}
              height={SCREEN_HEIGHT / 2}
            />
            <Rect
              x={0}
              y={SCREEN_HEIGHT / 2}
              width={SCREEN_WIDTH}
              color={Colors.black}
              height={SCREEN_HEIGHT / 2}
            />
          </Group>
        </Canvas>
      </GestureDetector>
    </>
  );
};

const styles = StyleSheet.create({});
