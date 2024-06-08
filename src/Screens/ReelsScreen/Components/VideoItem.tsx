import {StyleSheet, View} from 'react-native';
import React, {memo, useEffect, useRef, useState} from 'react';
import {CommonStyle} from '@/Helpers';
import Video, {VideoRef} from 'react-native-video';
import {getPercentage, getSlideTime} from '@/Helpers/Utils';
import {useSharedValue, withTiming} from 'react-native-reanimated';
import {ActivityIndicator} from 'react-native-paper';
import {Slider} from 'react-native-awesome-slider';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface VideoItemProps {
  url: string;
  isVisible: boolean;
}
const VideoItem = (props: VideoItemProps) => {
  const {url, isVisible} = props;
  const [isPaused, setIsPaused] = useState(true);
  const min = useSharedValue(0);
  const max = useSharedValue(100);
  const progress = useSharedValue(0);
  const cacheProgress = useSharedValue(0);
  const duration = useSharedValue(0);
  const videoRef = useRef<VideoRef>(null);
  const [isBuffering, setIsBuffering] = useState(false);
  const {bottom} = useSafeAreaInsets();

  useEffect(() => {
    setIsPaused(!isVisible);
  }, [isVisible]);

  return (
    <View style={CommonStyle.screen}>
      <Video
        paused={isPaused}
        source={{uri: url}}
        style={[CommonStyle.flex]}
        onProgress={event => {
          if (event) {
            const current = getPercentage(event.currentTime, duration.value);
            const buffer = getPercentage(
              event.playableDuration,
              duration.value,
            );
            progress.value = withTiming(current);
            cacheProgress.value = withTiming(buffer);
          }
        }}
        playInBackground={false}
        onLoadStart={() => setIsBuffering(true)}
        onLoad={({duration: d}) => {
          duration.value = d;
          setIsBuffering(false);
        }}
      />
      {!isBuffering && (
        <Slider
          cache={cacheProgress}
          progress={progress}
          minimumValue={min}
          style={[styles.sliderStyle, {bottom}]}
          onSlidingComplete={value => {
            videoRef.current?.seek(getSlideTime(value, duration.value));
          }}
          maximumValue={max}
        />
      )}
      {isBuffering && (
        <View
          style={[
            CommonStyle.flex,
            CommonStyle.center,
            StyleSheet.absoluteFill,
          ]}>
          <ActivityIndicator />
        </View>
      )}
    </View>
  );
};

export default memo(VideoItem);
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  sliderStyle: {
    position: 'absolute',
    bottom: 10,
    width: '95%',
    alignSelf: 'center',
  },
});
