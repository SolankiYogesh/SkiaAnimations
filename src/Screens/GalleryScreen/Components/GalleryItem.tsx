import React, {useRef} from 'react'
import {Image, Pressable, StyleSheet, View} from 'react-native'
import Animated, {FadeInLeft} from 'react-native-reanimated'

import {ModalType} from '../AnimatedImageModal'
import {Colors} from '@/Helpers'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

interface GalleryItemProps {
  uri: string
  index: number
  onSelectImage: (value: ModalType) => void
  itemSize: number
}

export default (props: GalleryItemProps) => {
  const {index, itemSize, onSelectImage, uri} = props
  const ref = useRef<View>(null)
  return (
    <AnimatedPressable
      ref={ref}
      collapsable={false}
      entering={FadeInLeft.delay(index * 300)}
      onPress={() => {
        if (ref.current) {
          ref.current.measure(
            (x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
              onSelectImage({
                height: itemSize,
                width: itemSize,
                x: pageX,
                y: pageY,
                image: {
                  uri
                }
              })
            }
          )
        }
      }}
      style={[
        styles.itemContainer,
        {
          width: itemSize,
          height: itemSize
        }
      ]}
    >
      <Image borderRadius={20} resizeMode={'cover'} source={{uri}} style={styles.imageStyle} />
    </AnimatedPressable>
  )
}

const styles = StyleSheet.create({
  imageStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 20
  },
  itemContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.white
  }
})
