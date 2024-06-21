import React, {useCallback} from 'react'
import {Dimensions} from 'react-native'
import {Gesture, GestureDetector} from 'react-native-gesture-handler'
import {useSharedValue, withTiming} from 'react-native-reanimated'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {BottomTabBarProps} from '@react-navigation/bottom-tabs'
import {Canvas} from '@shopify/react-native-skia'

import CommonStyle from '../Helpers/CommonStyle'
import Screens from '../Helpers/Screens'
import LinearBackground from './LinearBackground'
import TabBox from './TabBox'
import Constant from '@/Helpers/Constant'
import SVG from '@/Resource/SVG'
import Images from '@/Theme/Images'

const {width} = Dimensions.get('window')

const RouteType = {
  [Screens.SimpleCommentList]: {
    title: 'Comment',
    svg: SVG.comment,
    fill: Images.comment_fill
  },
  [Screens.ReelsScreen]: {
    title: 'Reels',
    svg: SVG.reel,
    fill: Images.reels_fill
  },
  [Screens.AnimatedListUserScreen]: {
    title: 'Users',
    svg: SVG.user,
    fill: Images.user_fill
  }
} as any

const SLIDER_POS =
  Constant.TAB_BAR_WIDTH - Constant.TAB_BAR_WIDTH / 2 - Constant.ICON_SIZE / 2 - Constant.MARGIN * 2

export default (props: BottomTabBarProps) => {
  const {navigation, state} = props
  const {bottom} = useSafeAreaInsets()

  const animatedSlider = useSharedValue(SLIDER_POS)

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
        animatedSlider.value = withTiming(index * Constant.TAB_BAR_WIDTH + SLIDER_POS)
        navigation.navigate(route)
      }
    })

  return (
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
  )
}
