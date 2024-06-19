import React from 'react';
import {
  Canvas,
  Group,
  Image,
  Mask,
  Rect,
  RoundedRect,
  useImage,
} from '@shopify/react-native-skia';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import CommonStyle from '@/Theme/CommonStyle';

import {SCREEN_HEIGHT, SCREEN_WIDTH} from '@/Helpers/Measurements';
import Images from '@/Theme/Images';
import {clamp, useDerivedValue, useSharedValue} from 'react-native-reanimated';
import {StatusBar} from 'react-native';
import {Colors} from '@/Helpers';

const SIZE = 128;

const center = {
  x: SCREEN_WIDTH / 2 - SIZE / 2,
  y: SCREEN_HEIGHT / 2 - SIZE / 2,
};

export default () => {
  const background = useImage(Images.background);
  const translationX = useSharedValue(center.x);
  const translationY = useSharedValue(center.y);
  const prevTranslationX = useSharedValue(center.x);
  const prevTranslationY = useSharedValue(center.y);
  const scale = useSharedValue(1);
  const scaleSaved = useSharedValue(0);
  const rotation = useSharedValue(0);
  const savedRotation = useSharedValue(0);

  const animatedSize = useDerivedValue(() => {
    return scale.value * SIZE;
  });

  const pan = Gesture.Pan()
    .minDistance(1)
    .onStart(() => {
      prevTranslationX.value = translationX.value;
      prevTranslationY.value = translationY.value;
    })
    .onUpdate(event => {
      const maxTranslateX = SCREEN_WIDTH - animatedSize.value;

      const maxTranslateY = SCREEN_HEIGHT - animatedSize.value;

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
    .runOnJS(true);

  const pitch = Gesture.Pinch()
    .onChange(({scale: s}) => {
      scale.value = clamp(scaleSaved.value + s, 0.5, 1.5);
    })
    .onEnd(event => {
      scaleSaved.value = clamp(event.scale, 0.5, 1.5);
    })
    .runOnJS(true);

  const rotateGesture = Gesture.Rotation()
    .onUpdate(event => {
      rotation.value = savedRotation.value + event.rotation;
    })
    .onEnd(() => {
      savedRotation.value = rotation.value;
    });

  const gesture = Gesture.Race(pan, pitch, rotateGesture);

  const transform = useDerivedValue(() => {
    return [{rotate: rotation.value}];
  });

  const origin = useDerivedValue(() => {
    return {
      x: SCREEN_WIDTH / 2 - animatedSize.value / 2 / animatedSize.value / 2,
      y: SCREEN_HEIGHT / 2 - animatedSize.value / 2 / animatedSize.value / 2,
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <>
        <StatusBar translucent backgroundColor={Colors.transparent} />
        <Canvas style={CommonStyle.flex}>
          <Mask
            mask={
              <Group>
                <Rect
                  x={0}
                  y={0}
                  height={SCREEN_HEIGHT}
                  width={SCREEN_WIDTH}
                  opacity={0.2}
                  color={'black'}
                />
                <RoundedRect
                  width={animatedSize}
                  height={animatedSize}
                  x={translationX}
                  y={translationY}
                  transform={transform}
                  origin={origin}
                  r={20}
                />
              </Group>
            }>
            <Image
              x={0}
              y={0}
              width={SCREEN_WIDTH}
              height={SCREEN_HEIGHT}
              image={background}
              fit="cover"
            />
          </Mask>
        </Canvas>
      </>
    </GestureDetector>
  );
};
