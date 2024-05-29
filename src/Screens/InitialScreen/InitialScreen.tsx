import React from 'react';
import Card from './Card';
import {Screens} from '@/Helpers';
import AppContainer from '@/Components/AppContianer';
const InitialScreen = () => {
  return (
    <AppContainer>
      <Card
        screen={Screens.SimpleCommentList}
        title="Comment List With FlashList"
      />
      <Card
        screen={Screens.CarouselCommentList}
        title="Comment List With FlashList + Carousel"
      />
      <Card screen={Screens.ReelsScreen} title="Reels List With FlashList" />
    </AppContainer>
  );
};

export default InitialScreen;
