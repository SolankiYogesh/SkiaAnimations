import {StatusBar, View} from 'react-native';
import React, {useState} from 'react';
import {Colors, CommonStyle} from '@/Helpers';
import {FlashList} from '@shopify/flash-list';
import VideoItem from './Components/VideoItem';
import {randomData} from '@/data/RandomData';
import {WINDOW_HEIGHT} from '@/Helpers/Measurements';

const ReelsScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <View style={CommonStyle.flex}>
      <StatusBar translucent backgroundColor={Colors.transparent} />

      <FlashList
        data={randomData}
        pagingEnabled
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
    </View>
  );
};

export default ReelsScreen;
