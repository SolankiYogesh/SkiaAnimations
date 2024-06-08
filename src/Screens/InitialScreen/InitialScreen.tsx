import React from 'react';
import Card from './Card';
import {Screens} from '@/Helpers';
import AppContainer from '@/Components/AppContianer';
import {StyleSheet} from 'react-native';
const InitialScreen = () => {
  return (
    <AppContainer style={styles.container}>
      <Card
        screen={Screens.SimpleCommentList}
        title="Comment List With FlashList"
      />
      <Card
        screen={Screens.CarouselCommentList}
        title="Comment List With FlashList + Carousel"
      />
      <Card screen={Screens.ReelsScreen} title="Reels List With FlashList" />
      <Card screen={Screens.AnimatedListUserScreen} title="Animated List " />
      <Card screen={Screens.SkiAnimatedDog} title="Ski Animated Dog" />
      <Card
        screen={Screens.VideoWithBufferSlider}
        title="Video With Buffer Slider"
      />
    </AppContainer>
  );
};

export default InitialScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});
