import React, {useCallback, useEffect} from 'react'
import {Image, ImageSourcePropType, Pressable, StyleSheet, View} from 'react-native'
import {Gesture, GestureDetector} from 'react-native-gesture-handler'
import Animated, {
  clamp,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'

import {Colors} from '@/Helpers'
import {SCREEN_HEIGHT, WINDOW_HEIGHT, WINDOW_WIDTH} from '@/Helpers/Measurements'
import Images from '@/Theme/Images'

export interface ModalType {
  x: number
  y: number
  width: number
  height: number
  image: ImageSourcePropType
}
interface AnimatedImageModalProps {
  item: ModalType
  onClose: () => void
}
export default ({item, onClose}: AnimatedImageModalProps) => {
  const scale = useSharedValue({x: item.width, y: item.height})
  const zoom = useSharedValue(1)
  const zoomSaved = useSharedValue(0)
  useEffect(() => {
    scale.value = withTiming({
      x: WINDOW_WIDTH,
      y: SCREEN_HEIGHT
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const close = useCallback(() => {
    scale.value = withTiming(
      {
        x: item.height,
        y: item.height
      },
      {},
      (isFinished) => {
        if (isFinished) {
          runOnJS(onClose)()
        }
      }
    )
  }, [item.height, onClose, scale])

  const zoomGesture = Gesture.Pinch()
    .onChange(({scale: s}) => {
      zoom.value = clamp(
        zoomSaved.value * s,
        0.5,
        Math.min(WINDOW_WIDTH / 100, WINDOW_HEIGHT / 100)
      )
    })
    .onEnd((event) => {
      zoomSaved.value = clamp(event.scale, 1, 4)
    })

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: scale.value.x,
      height: scale.value.y,
      transform: [
        {
          translateX: interpolate(scale.value.x, [item.height, WINDOW_WIDTH], [item.x, 0])
        },
        {
          translateY: interpolate(scale.value.x, [item.height, WINDOW_WIDTH], [item.y, 0])
        },
        {
          scale: zoom.value
        }
      ]
    }
  }, [zoom, scale])

  return (
    <View style={StyleSheet.absoluteFill}>
      <Pressable style={styles.touchIconStyle} onPress={close}>
        <Image style={styles.imageStyle} source={Images.close} />
      </Pressable>
      <GestureDetector gesture={zoomGesture}>
        <Animated.Image
          source={item.image}
          resizeMode={'contain'}
          style={[
            {
              transform: [
                {
                  translateX: item.x
                },
                {
                  translateY: item.y
                }
              ]
            },
            styles.imageContainer,
            animatedStyle
          ]}
        />
      </GestureDetector>
    </View>
  )
}
const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 20,
    position: 'absolute'
  },
  touchIconStyle: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10000,
    position: 'absolute',
    top: 40,
    right: 30
  },
  imageStyle: {
    width: '80%',
    height: '80%',
    tintColor: Colors.white
  }
})
