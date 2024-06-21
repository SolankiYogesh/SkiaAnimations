import React from 'react'
import {StatusBar} from 'react-native'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {PaperProvider} from 'react-native-paper'

import AppNavigation from './src/Routes/AppNavigation'
import {Colors, CommonStyle} from '@/Helpers'

const App = () => (
  <PaperProvider>
    <GestureHandlerRootView style={CommonStyle.flex}>
      <StatusBar translucent barStyle={'light-content'} backgroundColor={Colors.transparent} />
      <AppNavigation />
    </GestureHandlerRootView>
  </PaperProvider>
)
export default App
