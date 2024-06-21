import React, {useEffect} from 'react'
import {Platform, StyleSheet, Text, View} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withTiming
} from 'react-native-reanimated'

import CommonStyle from '@/Theme/CommonStyle'

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)
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
  '#4682B4'
] // Steel Blue];
const endColors = [
  '#4682B4',
  '#32CD32',
  '#FFD700',
  '#FF6666',
  '#FF007F',
  '#FF00FF',
  '#7F00FF',
  '#0000FF',
  '#007FFF',
  '#00FFFF',
  '#00FF7F',
  '#00FF00',
  '#7FFF00',
  '#FFFF00',
  '#FF7F00',
  '#FF0000',
  '#4A00E0',
  '#12c2e9',
  '#8E2DE2',
  '#c471ed',
  '#E100FF'
]
export default () => {
  const animatedValue = useSharedValue(0)
  useEffect(() => {
    animatedValue.value = withRepeat(
      withTiming(1, {
        duration: 5000,
        easing: Easing.linear
      }),
      -1,
      true
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const animatedProps = useAnimatedProps(() => {
    return {
      colors: [
        interpolateColor(animatedValue.value, [0, 1], [startColors[20], endColors[20]]),
        interpolateColor(animatedValue.value, [0, 1], [startColors[1], endColors[1]]),
        interpolateColor(animatedValue.value, [0, 1], [startColors[2], endColors[2]]),
        interpolateColor(animatedValue.value, [0, 1], [startColors[3], endColors[3]]),
        interpolateColor(animatedValue.value, [0, 1], [startColors[4], endColors[4]]),
        interpolateColor(animatedValue.value, [0, 1], [startColors[5], endColors[5]])
      ]
    }
  })

  return (
    <View style={CommonStyle.flex}>
      <AnimatedLinearGradient
        {...({} as any)}
        style={CommonStyle.flex}
        animatedProps={animatedProps}
      />
      {Platform.OS === 'android' && (
        <View style={[CommonStyle.centerFlex, StyleSheet.absoluteFillObject]}>
          <Text style={styles.warningStyle}>
            {'Linear Gradient Animation Not support in android  😭'}
          </Text>
        </View>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  warningStyle: {
    fontWeight: 'bold',
    fontSize: 20,
    zIndex: 10000,
    textAlign: 'center'
  }
})
