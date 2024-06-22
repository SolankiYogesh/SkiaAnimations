import React from 'react'
import {StyleSheet} from 'react-native'
import AnimateableText from 'react-native-animateable-text'
import {Slider} from 'react-native-awesome-slider'
import Animated, {
  clamp,
  SharedValue,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue
} from 'react-native-reanimated'

import {Colors} from '@/Helpers'
import {SCREEN_WIDTH} from '@/Helpers/Measurements'

interface ScrollProgressViewProps {
  height: SharedValue<number>
  y: SharedValue<number>
  opacity: SharedValue<number>
}

export default ({y, height, opacity}: ScrollProgressViewProps) => {
  const min = useSharedValue(0)
  const max = useSharedValue(100)

  const progress = useDerivedValue(() => {
    const p = clamp(Math.round((y.value / height.value) * 100), 0, 100)
    return Number.isSafeInteger(p) ? p : 0
  })

  const animatedProps = useAnimatedProps(() => {
    return {
      text: `${progress.value}%`
    }
  })

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value
    }
  }, [opacity])

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <AnimateableText style={styles.textStyle} animatedProps={animatedProps} />
      <Slider
        thumbWidth={0}
        progress={progress}
        minimumValue={min}
        maximumValue={max}
        disableTapEvent
        disableTrackFollow
        theme={{
          minimumTrackTintColor: Colors.white
        }}
        containerStyle={styles.containerStyle}
      />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    width: SCREEN_WIDTH / 2,
    padding: 15,
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: Colors.darkShade312,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    borderWidth: 3,
    borderColor: Colors.darkShade211
  },
  textStyle: {
    color: Colors.white,
    fontSize: 15,
    width: 50
  },
  containerStyle: {
    backgroundColor: Colors.darkShade1B1
  }
})
