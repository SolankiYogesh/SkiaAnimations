import React from 'react'
import {StyleProp, View, ViewStyle} from 'react-native'

import {CommonStyle} from '@/Helpers'

interface AppContainerProps {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
}
export default ({children, style}: AppContainerProps) => {
  return <View style={[CommonStyle.flex, style]}>{children}</View>
}
