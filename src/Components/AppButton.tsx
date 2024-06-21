import React from 'react'
import {StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native'

import {Colors} from '@/Helpers'

interface AppButtonProps {
  title: string
  onPress?: () => void
  style?: StyleProp<ViewStyle>
  isBorder?: boolean
  disabled?: boolean
}

export default ({
  title,
  onPress,
  style = {},
  isBorder = true,
  disabled = false
}: AppButtonProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.container, isBorder && styles.borderStyle, style]}
    >
      <Text style={styles.titleTextStyle}>{title}</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 20,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',

    alignSelf: 'center'
  },
  borderStyle: {
    borderColor: Colors.blue,
    borderWidth: 2
  },
  titleTextStyle: {
    fontSize: 15,
    color: Colors.white,
    fontWeight: 'regular'
  }
})
