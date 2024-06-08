import {FlatList, StatusBar} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {Colors, CommonStyle} from '@/Helpers';
import VideoItem from './Components/VideoItem';

import reelsVideos from '@/data/VideoData';
import FloatButton from './Components/FloatButton';
import AppContainer from '@/Components/AppContianer';

const ReelsScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAuto, setIsAuto] = useState(false);
  const ref = useRef<FlatList>(null);
  const interval = useRef<any>(null);
  const onPress = useCallback(() => {
    if (isAuto) {
      if (interval.current) {
        clearInterval(interval.current);
        setIsAuto(false);
      }
    } else {
      interval.current = setInterval(() => {
        setActiveIndex(state => {
          let index: number;
          if (state >= reelsVideos.length - 1) {
            index = 0;
          } else {
            index = state + 1;
          }
          ref.current?.scrollToIndex({
            animated: true,
            index,
          });
          return index;
        });
      }, 1000);
      setIsAuto(true);
    }
  }, [isAuto]);

  return (
    <AppContainer>
      <StatusBar translucent backgroundColor={Colors.transparent} />

      <FlatList
        data={reelsVideos}
        pagingEnabled
        ref={ref}
        keyExtractor={item => item}
        initialScrollIndex={0}
        style={CommonStyle.screen}
        snapToAlignment="start"
        windowSize={3}
        showsVerticalScrollIndicator={false}
        maxToRenderPerBatch={3}
        decelerationRate={'normal'}
        bounces={false}
        onViewableItemsChanged={info => {
          setActiveIndex(info?.viewableItems[0]?.index || 0);
        }}
        renderItem={({index, item}) => (
          <VideoItem isVisible={activeIndex === index} url={item} />
        )}
      />
      <FloatButton onPress={onPress} isActive={isAuto} />
    </AppContainer>
  );
};

export default ReelsScreen;
