import React from 'react'
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native'
import {BackdropBlur, Canvas, Fill, Image, useImage} from '@shopify/react-native-skia'

import {CommonStyle} from '@/Helpers'
import {SCREEN_HEIGHT, WINDOW_HEIGHT, WINDOW_WIDTH} from '@/Helpers/Measurements'
import Images from '@/Theme/Images'

interface AppContainerProps {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
}
export default ({children, style}: AppContainerProps) => {
  const image = useImage(Images.background)
  return (
    <View style={[CommonStyle.flex, style]}>
      {children}
      <Canvas style={[StyleSheet.absoluteFill, styles.container]}>
        <Image
          image={image}
          x={0}
          y={0}
          width={WINDOW_WIDTH}
          height={WINDOW_HEIGHT}
          fit={'cover'}
        />
        <BackdropBlur blur={12} clip={{x: 0, y: 0, width: WINDOW_WIDTH, height: SCREEN_HEIGHT}}>
          <Fill color={'rgba(0,0,0,0.5)'} />
        </BackdropBlur>
      </Canvas>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: -1
  }
})
