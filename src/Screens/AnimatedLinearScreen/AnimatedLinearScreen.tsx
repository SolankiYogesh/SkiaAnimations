import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Button} from 'react-native-paper'
import Animated, {ZoomIn, ZoomOut} from 'react-native-reanimated'

import AnimatedLinearGradient from './Components/AnimatedLinearGradient'
import AnimatedSkiaGradient from './Components/AnimatedSkiaGradient'
import AppContainer from '@/Components/AppContianer'
import CommonStyle from '@/Theme/CommonStyle'

export default () => {
  const [isNormal, setIsNormal] = React.useState(true)
  return (
    <AppContainer style={styles.container}>
      <Animated.View
        entering={ZoomIn}
        exiting={ZoomOut}
        key={String(isNormal)}
        style={CommonStyle.flex}
      >
        {isNormal ? <AnimatedLinearGradient /> : <AnimatedSkiaGradient />}
      </Animated.View>
      <View style={styles.buttonContainer}>
        <Button onPress={() => setIsNormal(false)} mode={'outlined'} compact>
          {'Skia Gradient'}
        </Button>
        <Button onPress={() => setIsNormal(true)} mode={'outlined'} compact>
          {'Linear Gradient'}
        </Button>
      </View>
    </AppContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 10
  },
  buttonContainer: {
    padding: 30,
    gap: 20
  }
})
