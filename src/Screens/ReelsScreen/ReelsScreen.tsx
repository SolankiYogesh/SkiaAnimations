import {StatusBar} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {Colors} from '@/Helpers';
import {FlashList} from '@shopify/flash-list';
import VideoItem from './Components/VideoItem';
import {WINDOW_HEIGHT} from '@/Helpers/Measurements';
import reelsVideos from '@/data/VideoData';
import FloatButton from './Components/FloatButton';
import AppContainer from '@/Components/AppContianer';

const ReelsScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAuto, setIsAuto] = useState(false);
  const ref = useRef<FlashList<string | number>>(null);
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

      <FlashList
        data={reelsVideos}
        pagingEnabled
        ref={ref}
        initialScrollIndex={0}
        snapToAlignment="start"
        decelerationRate={'normal'}
        onViewableItemsChanged={info => {
          setActiveIndex(info?.viewableItems[0]?.index || 0);
        }}
        estimatedItemSize={WINDOW_HEIGHT}
        renderItem={({index}) => (
          <VideoItem
            isVisible={activeIndex === index}
            url={'https://picsum.photos/200/300'}
          />
        )}
      />
      <FloatButton onPress={onPress} isActive={isAuto} />
    </AppContainer>
  );
};

export default ReelsScreen;
