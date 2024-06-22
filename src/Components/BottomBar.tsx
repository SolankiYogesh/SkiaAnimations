import React, {useCallback} from 'react'
import {Dimensions, StyleSheet, View} from 'react-native'
import {Gesture, GestureDetector} from 'react-native-gesture-handler'
import {useDerivedValue, useSharedValue, withTiming} from 'react-native-reanimated'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs'
import {Canvas, RoundedRect} from '@shopify/react-native-skia'

import CommonStyle from '../Helpers/CommonStyle'
import Screens from '../Helpers/Screens'
import LinearBackground from './LinearBackground'
import TabBox from './TabBox'
import Constant from '@/Helpers/Constant'
import SVG from '@/Resource/SVG'

const {width} = Dimensions.get('window')

const RouteType = {
  [Screens.SimpleCommentList]: {
    title: 'Comment',
    svg: SVG.comment
  },
  [Screens.ReelsScreen]: {
    title: 'Reels',
    svg: SVG.reel
  },
  [Screens.AnimatedListUserScreen]: {
    title: 'Users',
    svg: SVG.user
  }
} as any

const SLIDER_POS =
  Constant.TAB_BAR_WIDTH - Constant.TAB_BAR_WIDTH / 2 - Constant.ICON_SIZE / 2 - Constant.MARGIN * 2

export default (props: MaterialTopTabBarProps) => {
  const {navigation, state} = props
  const {bottom} = useSafeAreaInsets()

  const animatedSlider = useSharedValue(SLIDER_POS)
  const animatedY = useSharedValue(0)

  const getPressTabName = useCallback(
    (offset: number) => {
      const index = Math.floor(offset / Constant.TAB_BAR_WIDTH)

      if (index >= 0 && index < state.routes.length) {
        const route = state.routes[index].name

        return {route, index}
      } else {
        return {route: '', index: -1} // Handle out-of-bounds index gracefully
      }
    },
    [state.routes]
  )
  const gesture = Gesture.Tap()
    .runOnJS(true)
    .onEnd((event) => {
      const {route, index} = getPressTabName(event.x)
      if (index > -1) {
        animatedY.value = withTiming(Constant.HEIGHT, {}, (isFinished) => {
          if (isFinished) {
            animatedSlider.value = withTiming(
              index * Constant.TAB_BAR_WIDTH + SLIDER_POS,
              {},
              () => {
                animatedY.value = withTiming(0)
              }
            )
          }
        })
        navigation.navigate(route)
      }
    })

  const Y = useDerivedValue(() => -Constant.HEIGHT * 0.1 + animatedY.value)
  const X = useDerivedValue(() => animatedSlider.value + Constant.MARGIN / 2 / 2)

  return (
    <View style={styles.container}>
      <GestureDetector gesture={gesture}>
        <Canvas
          style={[
            CommonStyle.row,
            CommonStyle.absolute,
            {
              width,
              height: Constant.HEIGHT,
              bottom: bottom || 34
            }
          ]}
        >
          <LinearBackground />

          <RoundedRect
            x={X}
            y={Y}
            width={Constant.ICON_SIZE * 2}
            height={Constant.ICON_SIZE * 2}
            r={10}
            blendMode={'xor'}
            color={'white'}
          />

          {state.routes.map((route, index) => {
            const type = route.name as any
            const isFocused = state.index === index

            return (
              <TabBox
                animatedSlider={animatedSlider}
                svg={RouteType[type].svg}
                isActive={isFocused}
                key={route.key}
                size={Constant.ICON_SIZE}
                x={
                  index * Constant.TAB_BAR_WIDTH +
                  Constant.ICON_SIZE +
                  Constant.MARGIN +
                  Constant.MARGIN
                }
                width={Constant.TAB_BAR_WIDTH}
              />
            )
          })}
        </Canvas>
      </GestureDetector>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    zIndex: 1000000,
    bottom: 0
  }
})
