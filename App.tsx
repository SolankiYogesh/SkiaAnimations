import React from 'react';
import AppNavigation from './src/Routes/AppNavigation';
import {StatusBar} from 'react-native';
import {Colors, CommonStyle} from '@/Helpers';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';

const App = () => (
  <PaperProvider>
    <GestureHandlerRootView style={CommonStyle.flex}>
      <StatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor={Colors.transparent}
      />
      <AppNavigation />
    </GestureHandlerRootView>
  </PaperProvider>
);
export default App;
