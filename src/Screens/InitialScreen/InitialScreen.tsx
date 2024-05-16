import {View} from 'react-native';
import React from 'react';
import Card from './Card';
import {CommonStyle, Screens} from '@/Helpers';
const InitialScreen = () => {
  return (
    <View style={CommonStyle.flex}>
      <Card
        screen={Screens.SimpleCommentList}
        title="Comment List With FlashList"
      />
      <Card
        screen={Screens.CarouselCommentList}
        title="Comment List With FlashList + Carousel"
      />
      <Card
        screen={Screens.CarouselCommentList}
        title="Reels List With FlashList"
      />
    </View>
  );
};

export default InitialScreen;
