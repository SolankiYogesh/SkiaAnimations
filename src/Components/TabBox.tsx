import React from 'react'
import {SharedValue} from 'react-native-reanimated'
import {Group, ImageSVG, RoundedRect, Skia} from '@shopify/react-native-skia'

interface TabBoxProps {
  svg: string
  size: number
  x: number
  isActive: boolean
  animatedSlider: SharedValue<number>
  width: number
}

export default (props: TabBoxProps) => {
  const {svg, size, x, animatedSlider, width} = props

  const imageSVG = Skia.SVG.MakeFromString(svg)

  return (
    <Group>
      <RoundedRect x={animatedSlider} y={0} width={width / 2} height={5} r={32} color={'white'} />
      {/* <Rect width={size} height={size} x={x} y={size / 2} color={'red'}>
      </Rect> */}
      <ImageSVG style={'fill'} svg={imageSVG} width={size} height={size} x={x} y={size / 2} />
    </Group>
  )
}
