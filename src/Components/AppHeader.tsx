import React from 'react'
import {Platform, StyleSheet} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {
  BackdropBlur,
  Canvas,
  Fill,
  Image,
  matchFont,
  Text,
  useImage
} from '@shopify/react-native-skia'

import {Colors} from '@/Helpers'
import {WINDOW_WIDTH} from '@/Helpers/Measurements'
import Images from '@/Theme/Images'

interface AppHeaderProps {
  color?: string
  title: string
}

const fontFamily = Platform.select({ios: 'Helvetica', default: 'serif'})
const fontStyle = {
  fontFamily,
  fontSize: 22,
  fontStyle: 'italic',
  fontWeight: 'bold'
}
const font = matchFont(fontStyle as any)

export default ({title, color}: AppHeaderProps) => {
  const {top} = useSafeAreaInsets()
  const image = useImage(Images.background)
  return (
    <Canvas
      style={[
        styles.container,
        {
          paddingTop: top
        }
      ]}
    >
      <Image image={image} x={0} y={0} width={WINDOW_WIDTH} height={100} fit={'cover'} />
      <BackdropBlur blur={12} clip={{x: 0, y: 0, width: WINDOW_WIDTH, height: 100}}>
        <Fill color={'rgba(0,0,0,0.5)'} />
      </BackdropBlur>

      <Text
        x={WINDOW_WIDTH / 2 - font.measureText(title).width / 2}
        y={(100 + top) / 2 + font.measureText(title).height / 2}
        color={Colors.white}
        text={title}
        font={font}
      />
    </Canvas>
  )
}
const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH,
    height: 100
  }
})
