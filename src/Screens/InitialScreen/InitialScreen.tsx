import {View} from 'react-native';
import React from 'react';
import CommonStyle from '../../Helpers/CommonStyle';
import Card from './Card';
import Screens from '../../Helpers/Screens';

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
        screen={Screens.SimpleCommentList}
        title="Comment List With FlashList"
      />
      <Card
        screen={Screens.SimpleCommentList}
        title="Comment List With FlashList"
      />
      <Card
        screen={Screens.SimpleCommentList}
        title="Comment List With FlashList"
      />
    </View>
  );
};

export default InitialScreen;
