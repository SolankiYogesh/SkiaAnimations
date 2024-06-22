import React, {memo, useCallback, useContext, useRef, useState} from 'react'
import {ActivityIndicator, StyleSheet, View} from 'react-native'
import {Slider} from 'react-native-awesome-slider'
import {runOnJS, useAnimatedReaction, useSharedValue, withTiming} from 'react-native-reanimated'
import Video, {VideoRef} from 'react-native-video'
import {useIsFocused} from '@react-navigation/native'

import {ItemKeyContext, ViewabilityItemsContext} from './ViewabilityTrackerFlashList'
import {Colors, CommonStyle} from '@/Helpers'
import Constant from '@/Helpers/Constant'
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '@/Helpers/Measurements'
import {getPercentage, getSlideTime} from '@/Helpers/Utils'

interface VideoItemProps {
  url: string
  height?: number
  bottom?: number
}
const VideoItem = (props: VideoItemProps) => {
  const {url, height = SCREEN_HEIGHT, bottom = Constant.HEIGHT} = props

  const min = useSharedValue(0)
  const max = useSharedValue(100)
  const progress = useSharedValue(0)
  const cacheProgress = useSharedValue(0)
  const duration = useSharedValue(0)
  const videoRef = useRef<VideoRef>(null)
  const [isBuffering, setIsBuffering] = useState(false)
  const id = useContext(ItemKeyContext)
  const context = useContext(ViewabilityItemsContext)
  const isFocus = useIsFocused()

  const invisibleAction = useCallback(() => {
    requestAnimationFrame(() => {
      videoRef.current?.pause()
    })
  }, [])

  const visibleAction = useCallback(() => {
    requestAnimationFrame(() => {
      videoRef.current?.resume()
    })
  }, [])

  // we stop or play the Video depending on the list visibility state
  useAnimatedReaction(
    () => context.value,
    (ctx) => {
      if (!id) {
        return
      }
      if (ctx.includes(id) && isFocus) {
        // do stuff on item visible
        runOnJS(visibleAction)()
      } else if (!ctx.includes(id) || !isFocus) {
        // do stuff on item invisible
        runOnJS(invisibleAction)()
      }
    }
  )

  return (
    <View
      style={{
        width: SCREEN_WIDTH,
        height
      }}
    >
      <Video
        source={{
          uri: url
        }}
        ref={videoRef}
        onProgress={(event) => {
          const current = getPercentage(event.currentTime, duration.value)
          const buffer = getPercentage(event.playableDuration, duration.value)

          progress.value = withTiming(current)
          cacheProgress.value = withTiming(buffer)
        }}
        repeat
        resizeMode={'contain'}
        playInBackground={false}
        onLoadStart={() => setIsBuffering(true)}
        onLoad={({duration: d}) => {
          duration.value = d
          setIsBuffering(false)
        }}
        style={styles.container}
      />
      {!isBuffering && (
        <Slider
          cache={cacheProgress}
          progress={progress}
          minimumValue={min}
          style={[styles.sliderStyle, {bottom}]}
          onSlidingComplete={(value) => {
            videoRef.current?.seek(getSlideTime(value, duration.value))
          }}
          maximumValue={max}
        />
      )}
      {isBuffering && (
        <View style={[CommonStyle.flex, CommonStyle.center, StyleSheet.absoluteFill]}>
          <ActivityIndicator color={Colors.blue} size={'small'} />
        </View>
      )}
    </View>
  )
}

export default memo(VideoItem)
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  sliderStyle: {
    position: 'absolute',
    bottom: 10,
    width: '95%',
    alignSelf: 'center'
  }
})
