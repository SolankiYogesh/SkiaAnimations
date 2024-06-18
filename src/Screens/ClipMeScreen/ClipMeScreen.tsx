import React from 'react';
import {
  Canvas,
  Group,
  Image,
  rect,
  rrect,
  useImage,
} from '@shopify/react-native-skia';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import CommonStyle from '@/Theme/CommonStyle';

import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
} from '@/Helpers/Measurements';
import Images from '@/Theme/Images';
import {useDerivedValue, useSharedValue} from 'react-native-reanimated';
import {clamp} from 'lodash';
import {StatusBar} from 'react-native';
import {Colors} from '@/Helpers';

const size = 256;
const padding = 32;
const r = 8;

export default () => {
  const background = useImage(Images.background);
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const prevTranslationX = useSharedValue(0);
  const prevTranslationY = useSharedValue(0);
  const scale = useSharedValue(1);
  const scaleSaved = useSharedValue(0);

  const pan = Gesture.Pan()
    .minDistance(1)
    .onStart(() => {
      prevTranslationX.value = translationX.value;
      prevTranslationY.value = translationY.value;
    })
    .onUpdate(event => {
      const maxTranslateX = WINDOW_WIDTH - scale.value * size;
      const maxTranslateY = WINDOW_HEIGHT - scale.value * size;

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

  const pitch = Gesture.Pinch()
    .onChange(({scale: s}) => {
      scale.value = scaleSaved.value + s;
    })
    .onEnd(evnt => {
      scaleSaved.value = evnt.scale;
    });
  const gesture = Gesture.Race(pan, pitch);

  const roundedRect = useDerivedValue(() => {
    return rrect(
      rect(
        translationX.value,
        translationY.value,
        scale.value * size - padding * 2,
        scale.value * size - padding * 2,
      ),
      r,
      r,
    );
  });

  const transform = useDerivedValue(() => {
    return [{scale: scale.value}];
  });

  return (
    <GestureDetector gesture={gesture}>
      <>
        <StatusBar translucent backgroundColor={Colors.transparent} />
        <Canvas style={CommonStyle.flex}>
          <Group
            transform={transform}
            origin={{x: (scale.value * size) / 2, y: (scale.value * size) / 2}}
            clip={roundedRect}>
            <Image
              x={0}
              y={0}
              width={SCREEN_WIDTH}
              height={SCREEN_HEIGHT}
              image={background}
              fit="cover"
            />
          </Group>
        </Canvas>
      </>
    </GestureDetector>
  );
};
