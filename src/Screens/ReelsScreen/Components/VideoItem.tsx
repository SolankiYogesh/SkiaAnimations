import {Image, View} from 'react-native';
import React, {memo} from 'react';
import {CommonStyle} from '@/Helpers';

interface VideoItemProps {
  url: string;
  isVisible?: boolean;
}
const VideoItem = (props: VideoItemProps) => {
  const {url} = props;

  return (
    <View style={CommonStyle.screen}>
      <Image source={{uri: url}} style={CommonStyle.screen} />
    </View>
  );
};

export default memo(VideoItem);
