import React, {useCallback, useEffect, useRef, useState} from 'react'
import {FlatList, Image as RnImage, Platform, Pressable, StyleSheet, View} from 'react-native'
import RNFS from 'react-native-fs'
import {openSettings} from 'react-native-permissions'
import Animated, {
  FadeInLeft,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming
} from 'react-native-reanimated'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {Canvas, Fill, Group, ImageShader, Shader, Skia, useImage} from '@shopify/react-native-skia'
import _ from 'lodash'

import {Colors} from '@/Helpers'
import Constant from '@/Helpers/Constant'
import {SCREEN_HEIGHT, SCREEN_WIDTH, WINDOW_WIDTH} from '@/Helpers/Measurements'
import Permission from '@/Helpers/Permission'
import {random} from '@/Helpers/Utils'
import Images from '@/Theme/Images'
import Transitions from '@/Transitions'

const numColumns = 3
const gap = 5
const availableSpace = WINDOW_WIDTH - 20 - (numColumns - 1) * gap
const itemSize = availableSpace / numColumns

const source = Skia.RuntimeEffect.Make(Transitions(random(0, 2)))
const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
export default () => {
  const progress = useSharedValue(0)
  const [images, setImages] = useState<string[]>([])
  const {top} = useSafeAreaInsets()
  const image1 = useImage(Images.image1)
  const image2 = useImage(Images.image2)

  const viewRef = useRef<View>(null)

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1.5, {
        duration: 3000
      }),
      -1,
      true
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const getCameraPermission = () => {
      Permission.getStoragePermission().then(async (response) => {
        if (response) {
          const files = await RNFS.readDir(Constant.Dir)
          const photos = files.map((file) => 'file://' + file.path)
          const sort = _.orderBy(photos, '', ['desc'])
          setImages(sort)
        } else {
          openSettings()
        }
      })
    }

    getCameraPermission()
  }, [])

  const renderItem = useCallback((uri: string, index: number) => {
    return (
      <AnimatedPressable
        entering={FadeInLeft.delay(index * 300)}
        style={[
          styles.itemContainer,
          {
            width: itemSize,
            height: itemSize
          }
        ]}
      >
        <RnImage borderRadius={20} resizeMode={'cover'} source={{uri}} style={styles.imageStyle} />
      </AnimatedPressable>
    )
  }, [])

  const uniforms = useDerivedValue(() => ({
    progress: progress.value,
    resolution: [SCREEN_WIDTH, SCREEN_WIDTH]
  }))

  return (
    <View
      ref={viewRef}
      collapsable={false}
      style={[
        styles.containerStyle,
        Platform.OS === 'android'
          ? {
              paddingTop: top
            }
          : {}
      ]}
    >
      {images.length > 0 && (
        <FlatList
          data={images}
          keyExtractor={(item) => item}
          renderItem={({item, index}) => renderItem(item, index)}
          showsVerticalScrollIndicator={false}
          pagingEnabled
          collapsable={false}
          numColumns={numColumns}
          contentContainerStyle={{gap}}
          columnWrapperStyle={{gap}}
          snapToAlignment={'center'}
          showsHorizontalScrollIndicator={false}
        />
      )}

      <Canvas style={[StyleSheet.absoluteFill, styles.canvasContainer]}>
        <Group>
          <Fill>
            {source && (
              <Shader uniforms={uniforms} source={source}>
                <ImageShader
                  image={image1}
                  fit={'cover'}
                  width={SCREEN_WIDTH}
                  height={SCREEN_HEIGHT}
                  x={0}
                  y={0}
                />
                <ImageShader
                  image={image2}
                  fit={'cover'}
                  width={SCREEN_WIDTH}
                  height={SCREEN_HEIGHT}
                  x={0}
                  y={0}
                />
              </Shader>
            )}
          </Fill>
        </Group>
      </Canvas>
    </View>
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
  },
  containerStyle: {
    flex: 1,
    paddingHorizontal: 10
  },
  canvasContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    zIndex: -1
  }
})
