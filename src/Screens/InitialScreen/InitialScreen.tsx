import React from 'react'
import {StyleSheet} from 'react-native'
import Animated from 'react-native-reanimated'

import Card from './Card'
import AppContainer from '@/Components/AppContianer'
import {Screens} from '@/Helpers'

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
  return (
    <AppContainer style={styles.container}>
      <Animated.FlatList
        data={initialScreenData}
        keyExtractor={(item) => item.screen}
        renderItem={({item, index}) => (
          <Card index={index} screen={item.screen} title={item.title} />
        )}
      />
    </AppContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: 20,
    paddingVertical: 20,
    paddingHorizontal: 10
  }
})
