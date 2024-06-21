import React from 'react'
import BootSplash from 'react-native-bootsplash'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import BottomNavigation from './BottomNavigation'
import AppHeader from '@/Components/AppHeader'
import {Screens} from '@/Helpers'
import {
  AnimatedLinearScreen,
  BoxBlendModeScreen,
  CameraScreen,
  ClipMeScreen,
  GalleryScreen,
  InitialScreen,
  ScrollProgressTrackerScreen,
  ShaderScreen,
  SkiAnimatedDog,
  TopSheetWithGuard,
  VideoWithBufferSlider
} from '@/Screens'

const Stack = createNativeStackNavigator()
export default () => {
  return (
    <NavigationContainer onReady={() => BootSplash.hide({fade: true})}>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name={Screens.Initial}
          component={InitialScreen}
        />
        <Stack.Screen
          options={{
            header: () => <AppHeader title={'List'} />
          }}
          name={Screens.BottomNavigation}
          component={BottomNavigation}
        />
        <Stack.Screen
          options={{
            headerShown: false
          }}
          name={Screens.SkiAnimatedDog}
          component={SkiAnimatedDog}
        />
        <Stack.Screen
          options={{
            headerShown: false
          }}
          name={Screens.VideoWithBufferSlider}
          component={VideoWithBufferSlider}
        />
        <Stack.Screen
          options={{
            headerShown: false
          }}
          name={Screens.AnimatedLinearScreen}
          component={AnimatedLinearScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false
          }}
          name={Screens.TopSheetWithGuard}
          component={TopSheetWithGuard}
        />
        <Stack.Screen
          options={{
            headerShown: false
          }}
          name={Screens.ClipMeScreen}
          component={ClipMeScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false
          }}
          name={Screens.BoxBlendModeScreen}
          component={BoxBlendModeScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false
          }}
          name={Screens.ScrollProgressTrackerScreen}
          component={ScrollProgressTrackerScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false
          }}
          name={Screens.ShaderScreen}
          component={ShaderScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false
          }}
          name={Screens.CameraScreen}
          component={CameraScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false
          }}
          name={Screens.GalleryScreen}
          component={GalleryScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
