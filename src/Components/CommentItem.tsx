import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import Animated from 'react-native-reanimated'
import {widthPx} from 'measurements'

import {Colors, CommonStyle} from '@/Helpers'

interface CommentItemProps {
  item: CommentType
}
export default (props: CommentItemProps) => {
  const {item} = props

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.nameTextStyle}>
        {item.user.fullName + '   '}
        <Text style={styles.emailTextStyle}>{item.user.username}</Text>
      </Text>

      <Text style={styles.bodyTextStyle}>{item.body}</Text>
      <Animated.Image
        style={styles.imageStyle}
        source={{
          uri: `https://picsum.photos/200/300?random=${item.id}`
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    rowGap: 10,
    ...CommonStyle.shadow,
    borderColor: Colors.white,
    borderWidth: 1
  },
  imageStyle: {
    width: widthPx(90),
    height: 200,
    padding: 10,
    borderRadius: 20
  },
  nameTextStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    alignItems: 'center',
    color: Colors.white
  },
  emailTextStyle: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 10,
    color: Colors.white
  },
  bodyTextStyle: {
    fontSize: 13,
    fontWeight: '300',
    color: Colors.white
  }
})
