import React from 'react'
import {Platform} from 'react-native'
import {Group, matchFont, RoundedRect, Shadow, Text} from '@shopify/react-native-skia'

import {Colors} from '@/Helpers'
import {WINDOW_WIDTH} from '@/Helpers/Measurements'

interface CardProps {
  title: string
  isInner: boolean
  index: number
}

const fontFamily = Platform.select({ios: 'Helvetica', default: 'serif'})
const fontStyle = {
  fontFamily,
  fontSize: 14,
  fontStyle: 'italic',
  fontWeight: 'bold'
}
const font = matchFont(fontStyle as any)

const MARGIN = 20
const HEIGHT = 50
const WIDTH = WINDOW_WIDTH * 0.8

export default (props: CardProps) => {
  const {title, isInner, index} = props

  return (
    <Group>
      <RoundedRect
        x={WINDOW_WIDTH / 2 - WIDTH / 2}
        y={index * (HEIGHT + MARGIN)}
        width={WIDTH}
        height={HEIGHT}
        r={32}
        color={'lightblue'}
      >
        <Shadow dx={12} dy={12} blur={25} color={Colors.blueShade3E} inner={isInner} />
        <Shadow dx={-12} dy={-12} blur={25} color={Colors.blueShade87} inner={isInner} />
      </RoundedRect>
      <Text
        x={WINDOW_WIDTH / 2 - WIDTH / 2 + WIDTH / 2 - font.measureText(title).width / 2}
        y={index * (HEIGHT + MARGIN) + (HEIGHT + MARGIN / 2) / 2}
        color={Colors.black}
        text={title}
        font={font}
      />
    </Group>
  )
}
