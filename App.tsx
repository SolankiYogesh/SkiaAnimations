import React from 'react'
import {LogBox, StatusBar} from 'react-native'
import {GestureHandlerRootView} from 'react-native-gesture-handler'

import AppNavigation from './src/Routes/AppNavigation'
import {Colors, CommonStyle} from '@/Helpers'

LogBox.ignoreAllLogs()
const App = () => (
  <GestureHandlerRootView style={CommonStyle.flex}>
    <StatusBar translucent barStyle={'light-content'} backgroundColor={Colors.transparent} />
    <AppNavigation />
  </GestureHandlerRootView>
)
export default App
