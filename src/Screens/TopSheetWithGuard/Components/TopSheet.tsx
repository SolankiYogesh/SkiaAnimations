import React, {forwardRef, memo, useCallback, useImperativeHandle} from 'react'
import {Dimensions, StyleSheet, View} from 'react-native'
import {Gesture, GestureDetector} from 'react-native-gesture-handler'
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'

import {Colors} from '@/Helpers'

const {height: SCREEN_HEIGHT, width: W_WIDTH} = Dimensions.get('window')

interface TopSheetProps {
  children: React.ReactNode
  onClose?: () => void
}
const PADDINGVERTICAL = 20 * 2
export interface TopSheetRef {
  toggle: (isClose?: boolean) => void
}
const TopSheet = forwardRef<TopSheetRef, TopSheetProps>((props, ref) => {
  const {children, onClose} = props

  const translateY = useSharedValue(0)
  const height = useSharedValue(0)
  const isBackDrop = useSharedValue(0)
  useImperativeHandle(ref, () => ({
    toggle: (isClose = false) => {
      if (isClose || (translateY.value === height.value && height.value > 0) || isBackDrop.value) {
        close()
      } else if (!isBackDrop.value) {
        open()
      }
    }
  }))

  const open = useCallback(() => {
    isBackDrop.value = withTiming(
      1,
      {
        duration: 50
      },
      (isFinished) => {
        if (isFinished) {
          translateY.value = withTiming(height.value)
        }
      }
    )
  }, [isBackDrop, translateY, height.value])

  const close = useCallback(() => {
    translateY.value = withTiming(0, {}, (isFinished) => {
      isBackDrop.value = 0
      if (isFinished && onClose) {
        runOnJS(onClose)()
      }
    })
  }, [isBackDrop, onClose, translateY])

  const context = useSharedValue({y: 0})
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = {y: translateY.value}
    })
    .onUpdate((event) => {
      const x = event.translationY + context.value.y
      translateY.value = Math.min(x, height.value)
    })
    .onEnd(() => {
      if (translateY.value < height.value / 2) {
        runOnJS(close)()
      } else {
        runOnJS(open)()
      }
    })

  const rBottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}]
      // paddingTop: top,
    }
  })

  const animatedBackdrop = useAnimatedStyle(() => {
    return {
      opacity: interpolate(translateY.value, [0, height.value], [0, 1]),

      display: isBackDrop.value === 0 ? 'none' : 'flex'
    }
  }, [])

  return (
    <Animated.View style={[styles.backdropStyle, animatedBackdrop]}>
      <Animated.View
        pointerEvents={'box-only'}
        onTouchStart={close}
        style={[styles.backdrop, animatedBackdrop]}
      />
      <GestureDetector gesture={gesture}>
        <Animated.View
          onLayout={(event) => {
            if (height.value === 0) {
              height.value = event.nativeEvent.layout.height + PADDINGVERTICAL
            }
          }}
          style={[styles.bottomSheetContainer, rBottomSheetStyle]}
        >
          {children}
          <View style={styles.line} />
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  )
})

export default memo(TopSheet)

const styles = StyleSheet.create({
  bottomSheetContainer: {
    width: W_WIDTH,
    backgroundColor: Colors.blue,
    position: 'absolute',
    // borderRadius: 25,
    zIndex: 1,
    left: 0,
    right: 0,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    bottom: SCREEN_HEIGHT + PADDINGVERTICAL,
    paddingVertical: 20
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: Colors.white,
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 2,
    position: 'absolute',
    bottom: 0
  },

  backdropStyle: {
    width: W_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: Colors.backdrop,
    opacity: 0,
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 999999
  },
  backdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    width: W_WIDTH,
    height: SCREEN_HEIGHT,
    opacity: 0,
    zIndex: -1
  }
})
