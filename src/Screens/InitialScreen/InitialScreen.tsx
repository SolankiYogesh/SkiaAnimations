import React, {useCallback} from 'react'
import {Gesture, GestureDetector} from 'react-native-gesture-handler'
import {useNavigation} from '@react-navigation/native'
import {Canvas} from '@shopify/react-native-skia'
import _ from 'lodash'

import Card from './Card'
import {AppContainer, AppHeader} from '@/Components'
import {Colors, Screens} from '@/Helpers'
import CommonStyle from '@/Theme/CommonStyle'

const initialScreenData = [
  {
    title: 'List',
    screen: Screens.BottomNavigation
  },
  {
    title: 'Ski Animated Dog',
    screen: Screens.SkiAnimatedDog
  },
  {
    title: 'Video With Buffer Slider',
    screen: Screens.VideoWithBufferSlider
  },
  {
    title: 'Animated Linear Gradient',
    screen: Screens.AnimatedLinearScreen
  },
  {
    title: 'Top Sheet',
    screen: Screens.TopSheetWithGuard
  },
  {
    title: 'Clip Feature with Gesture',
    screen: Screens.ClipMeScreen
  },
  {
    title: 'Box Blend',
    screen: Screens.BoxBlendModeScreen
  },
  {
    title: 'Scroll Tracker',
    screen: Screens.ScrollProgressTrackerScreen
  },
  {
    title: 'Shader Effect',
    screen: Screens.ShaderScreen
  },
  {
    title: 'Camera',
    screen: Screens.CameraScreen
  }
]

export default () => {
  const navigation = useNavigation()

  const getPressTabName = useCallback((offset: number) => {
    const index = Math.floor(offset / 70)

    if (index >= 0 && index < initialScreenData.length) {
      const route = initialScreenData[index].screen
      return {route, index}
    } else {
      return {route: '', index: -1} // Handle out-of-bounds index gracefully
    }
  }, [])

  const gesture = Gesture.Tap()
    .runOnJS(true)
    .onStart((event) => {
      const data = getPressTabName(event.y)

      if (data.index > -1) {
        navigation.navigate(data.route as never)
      }
    })

  return (
    <AppContainer>
      <AppHeader title={'Explore'} color={Colors.blueShade1E} />
      <GestureDetector gesture={gesture}>
        <Canvas style={CommonStyle.flex}>
          {_.map(initialScreenData, (item, index) => (
            <Card
              index={index + 0.1}
              isInner={index % 2 === 0}
              key={item.screen}
              title={item.title}
            />
          ))}
        </Canvas>
      </GestureDetector>
    </AppContainer>
  )
}
