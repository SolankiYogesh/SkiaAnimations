/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-unstable-nested-components */

import React from 'react'
import {Image, Pressable, StyleSheet, Text, View} from 'react-native'
import Animated, {FadeInDown, PinwheelOut} from 'react-native-reanimated'

import {UserType} from '../AnimatedListUserScreen'
import {Colors} from '@/Helpers'
import Images from '@/Theme/Images'

interface UserItemProps {
  item: UserType
  index: number
  onPressDelete: () => void
}
export default (props: UserItemProps) => {
  const {item, index, onPressDelete} = props
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)}
      exiting={PinwheelOut.duration(1000)}
      style={styles.itemContainer}
    >
      <View style={styles.rowContainer}>
        <Image style={styles.avatarStyle} source={{uri: item.profileImage}} />
        <Text style={styles.titleStyle}>{item.name}</Text>
      </View>
      <Pressable onPress={onPressDelete}>
        <Image style={styles.rightIconStyle} source={Images.bin} />
      </Pressable>
    </Animated.View>
  )
}
const styles = StyleSheet.create({
  itemContainer: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10
  },
  avatarStyle: {
    width: 55,
    height: 55,
    borderRadius: 300
  },
  titleStyle: {
    fontSize: 15,
    color: Colors.white,
    fontWeight: 'regular'
  },
  rightIconStyle: {
    width: 55,
    height: 55
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 15
  }
})
