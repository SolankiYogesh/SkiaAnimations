import React from 'react'
import {StatusBar, StyleSheet, View} from 'react-native'
import {Blur, Canvas, Image, useImage} from '@shopify/react-native-skia'

import CenterView from './CenterView'
import {Colors, CommonStyle} from '@/Helpers'
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '@/Helpers/Measurements'
import Images from '@/Theme/Images'

export default () => {
  const background = useImage(Images.background)
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor={Colors.transparent} barStyle={'light-content'} />

      <CenterView />
      <Canvas style={[StyleSheet.absoluteFill, CommonStyle.screen]}>
        <Image
          x={-5}
          y={-5}
          width={SCREEN_WIDTH}
          height={SCREEN_HEIGHT + 10}
          image={background}
          fit={'cover'}
        >
          <Blur blur={4} />
        </Image>
      </Canvas>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
