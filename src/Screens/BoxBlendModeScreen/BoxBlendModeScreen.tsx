import React from 'react'
import {Gesture, GestureDetector} from 'react-native-gesture-handler'
import {
  clamp,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming
} from 'react-native-reanimated'
import {Canvas, Group, Rect, RoundedRect, Shadow} from '@shopify/react-native-skia'

import {Colors} from '@/Helpers'
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '@/Helpers/Measurements'
import CommonStyle from '@/Theme/CommonStyle'

const SIZE = 100

export default () => {
  const translationX = useSharedValue(SCREEN_WIDTH / 2 - SIZE / 2)
  const translationY = useSharedValue(SCREEN_HEIGHT / 2 - SIZE / 2)
  const prevTranslationX = useSharedValue(SCREEN_WIDTH / 2 - SIZE / 2)
  const prevTranslationY = useSharedValue(SCREEN_HEIGHT / 2 - SIZE / 2)
  const rotate = useSharedValue(0)

  const pan = Gesture.Pan()
    .minDistance(1)
    .onStart(() => {
      rotate.value = withRepeat(
        withTiming(360, {
          duration: 60000
        }),
        -1,
        false
      )
    })
    .onUpdate((event) => {
      const maxTranslateX = SCREEN_WIDTH - SIZE
      const maxTranslateY = SCREEN_HEIGHT - SIZE

      translationX.value = clamp(prevTranslationX.value + event.translationX, 0, maxTranslateX)
      translationY.value = clamp(prevTranslationY.value + event.translationY, 0, maxTranslateY)
    })
    .onEnd(() => {
      rotate.value = withSpring(0)
      prevTranslationX.value = translationX.value
      prevTranslationY.value = translationY.value
    })
    .runOnJS(true)

  const origin = useDerivedValue(() => {
    return {
      x: translationX.value + SIZE / 2,
      y: translationY.value + SIZE / 2
    }
  }, [translationY.value, translationX.value])

  const transform = useDerivedValue(() => {
    return [
      {
        rotate: rotate.value
      }
    ]
  }, [rotate.value])

  return (
    <GestureDetector gesture={pan}>
      <Canvas style={CommonStyle.flex}>
        <Group
          blendMode={'difference'}
          layer={
            <RoundedRect
              x={translationX}
              y={translationY}
              width={SIZE}
              height={SIZE}
              origin={origin}
              transform={transform}
              color={'white'}
              r={15}
            >
              <Shadow dx={5} dy={5} blur={8} color={Colors.whiteShadeF4} />
              <Shadow dx={-5} dy={-5} blur={8} color={Colors.whiteShadeF4} />
            </RoundedRect>
          }
        >
          <Rect x={0} y={0} width={SCREEN_WIDTH} color={Colors.white} height={SCREEN_HEIGHT / 2} />
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
  )
}
