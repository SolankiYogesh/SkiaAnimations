import React from 'react'
import {StyleSheet} from 'react-native'
import {BackdropBlur, Canvas, Fill} from '@shopify/react-native-skia'

import {WINDOW_HEIGHT} from '@/Helpers/Measurements'

export default () => {
  return (
    <Canvas style={styles.container}>
      <BackdropBlur
        blendMode={'hardLight'}
        blur={25}
        clip={{x: 0, y: 0, width: WINDOW_HEIGHT, height: 100}}
      >
        <Fill color={'rgba(0, 0, 0, 0.7)'} />
      </BackdropBlur>
    </Canvas>
  )
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    position: 'absolute',
    top: 0
  }
})
