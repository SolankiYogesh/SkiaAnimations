import React from 'react'
import {SharedValue, useDerivedValue} from 'react-native-reanimated'
import {Circle, Group, ImageSVG, RoundedRect, Skia} from '@shopify/react-native-skia'

import Constant from '@/Helpers/Constant'

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

  const animateValue = useDerivedValue(() => animatedSlider.value)

  const imageSVG = Skia.SVG.MakeFromString(svg)
  const r = Constant.ICON_SIZE * 0.8

  const cx = useDerivedValue(() => {
    return animateValue.value + r + Constant.ICON_SIZE / 2 / 2
  })

  return (
    <Group>
      <RoundedRect x={animatedSlider} y={0} width={width / 2} height={5} r={32} color={'white'} />
      <Circle blendMode={'overlay'} cx={cx} cy={size + 2} r={r} color={'lightblue'} />
      <ImageSVG style={'fill'} svg={imageSVG} width={size} height={size} x={x} y={size / 2} />
    </Group>
  )
}
