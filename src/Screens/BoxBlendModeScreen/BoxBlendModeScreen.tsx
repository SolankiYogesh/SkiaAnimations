import {StyleSheet} from 'react-native';
import React from 'react';
import {Canvas, Group, Rect, RoundedRect} from '@shopify/react-native-skia';
import CommonStyle from '@/Theme/CommonStyle';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '@/Helpers/Measurements';
import {Colors} from '@/Helpers';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {clamp, useSharedValue} from 'react-native-reanimated';

const SIZE = 100;

const BoxBlendModeScreen = () => {
  const translationX = useSharedValue(SCREEN_WIDTH / 2 - SIZE / 2);
  const translationY = useSharedValue(SCREEN_HEIGHT / 2 - SIZE / 2);
  const prevTranslationX = useSharedValue(SCREEN_WIDTH / 2 - SIZE / 2);
  const prevTranslationY = useSharedValue(SCREEN_HEIGHT / 2 - SIZE / 2);

  const pan = Gesture.Pan()
    .minDistance(1)
    .onStart(() => {
      prevTranslationX.value = translationX.value;
      prevTranslationY.value = translationY.value;
    })
    .onUpdate(event => {
      const maxTranslateX = SCREEN_WIDTH - SIZE;
      const maxTranslateY = SCREEN_HEIGHT - SIZE;

      translationX.value = clamp(
        prevTranslationX.value + event.translationX,
        -maxTranslateX,
        maxTranslateX,
      );
      translationY.value = clamp(
        prevTranslationY.value + event.translationY,
        -maxTranslateY,
        maxTranslateY,
      );
    })

    .runOnJS(true);

  return (
    <GestureDetector gesture={pan}>
      <Canvas style={CommonStyle.flex}>
        <Group
          blendMode={'difference'}
          origin={{
            x: SCREEN_WIDTH / 2 - SIZE / 2,
            y: SCREEN_HEIGHT / 2 - SIZE / 2,
          }}
          layer={
            <RoundedRect
              x={translationX}
              y={translationY}
              width={SIZE}
              origin={{
                x: SCREEN_WIDTH / 2 - SIZE / 2,
                y: SCREEN_HEIGHT / 2 - SIZE / 2,
              }}
              height={SIZE}
              color={'white'}
              r={15}
            />
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
  );
};

export default BoxBlendModeScreen;

const styles = StyleSheet.create({});
