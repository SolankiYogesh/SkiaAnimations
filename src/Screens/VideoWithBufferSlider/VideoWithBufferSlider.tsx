import React, {useRef, useState} from 'react'
import {ActivityIndicator, StyleSheet, View} from 'react-native'
import {Slider} from 'react-native-awesome-slider'
import {useSharedValue, withTiming} from 'react-native-reanimated'
import Video, {VideoRef} from 'react-native-video'

import {CommonStyle} from '@/Helpers'
import {getPercentage, getSlideTime} from '@/Helpers/Utils'

export default () => {
  const min = useSharedValue(0)
  const max = useSharedValue(100)
  const progress = useSharedValue(0)
  const cacheProgress = useSharedValue(0)
  const duration = useSharedValue(0)
  const videoRef = useRef<VideoRef>(null)
  const [isBuffering, setIsBuffering] = useState(false)

  return (
    <View style={CommonStyle.flex}>
      <Video
        source={{
          uri: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
        }}
        ref={videoRef}
        onProgress={(event) => {
          const current = getPercentage(event.currentTime, duration.value)
          const buffer = getPercentage(event.playableDuration, duration.value)
          progress.value = withTiming(current)
          cacheProgress.value = withTiming(buffer)
        }}
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
          style={styles.sliderStyle}
          onSlidingComplete={(value) => {
            videoRef.current?.seek(getSlideTime(value, duration.value))
          }}
          maximumValue={max}
        />
      )}

      {isBuffering && (
        <View style={[CommonStyle.flex, CommonStyle.center, StyleSheet.absoluteFill]}>
          <ActivityIndicator />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  sliderStyle: {
    position: 'absolute',
    bottom: 50,
    width: '95%',
    alignSelf: 'center'
  }
})
