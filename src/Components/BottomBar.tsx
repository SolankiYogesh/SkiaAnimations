import {Dimensions} from 'react-native';
import React, {useCallback} from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import Screens from '../Helpers/Screens';

import CommonStyle from '../Helpers/CommonStyle';
import {Canvas} from '@shopify/react-native-skia';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSharedValue, withTiming} from 'react-native-reanimated';
import TabBox from './TabBox';
import Images from '@/Theme/Images';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import LinearBackground from './LinearBackground';
import Constant from '@/Helpers/Constant';

const {width} = Dimensions.get('window');

const RouteType = {
  [Screens.SimpleCommentList]: {
    title: 'Home',
    icon: Images.home,
    fill: Images.home_fill,
  },
  [Screens.CarouselCommentList]: {
    title: 'Feed',
    icon: Images.feed,
    fill: Images.feed_fill,
  },
  [Screens.ReelsScreen]: {
    title: 'Shop',
    icon: Images.shop,
    fill: Images.shop_fill,
  },
  [Screens.AnimatedListUserScreen]: {
    title: 'Setting',
    icon: Images.setting,
    fill: Images.setting_fill,
  },
} as any;

const SLIDER_POS =
  Constant.TAB_BAR_WIDTH - Constant.TAB_BAR_WIDTH / 2 - Constant.MARGIN * 2;

export default (props: BottomTabBarProps) => {
  const {navigation, state} = props;
  const {bottom} = useSafeAreaInsets();

  const animatedSlider = useSharedValue(SLIDER_POS);

  const getPressTabName = useCallback(
    (offset: number) => {
      const index = Math.floor(offset / Constant.TAB_BAR_WIDTH);

      if (index >= 0 && index < 4) {
        const route = state.routes[index].name;
        return {route, index};
      } else {
        return {route: '', index: -1}; // Handle out-of-bounds index gracefully
      }
    },
    [state.routes],
  );
  const gesture = Gesture.Tap()
    .runOnJS(true)
    .onEnd(event => {
      const {route, index} = getPressTabName(event.x);
      if (index > -1) {
        animatedSlider.value = withTiming(
          index * Constant.TAB_BAR_WIDTH + SLIDER_POS,
        );
        navigation.navigate(route);
      }
    });

  return (
    <GestureDetector gesture={gesture}>
      <Canvas
        style={[
          CommonStyle.row,
          CommonStyle.absolute,
          {
            width: width,
            height: Constant.HEIGHT,
            bottom: bottom || 34,
          },
        ]}>
        <LinearBackground />

        {state.routes.map((route, index) => {
          const type = route.name as any;
          const isFocused = state.index === index;

          return (
            <TabBox
              animatedSlider={animatedSlider}
              icon={isFocused ? RouteType[type].fill : RouteType[type].icon}
              isActive={isFocused}
              key={index}
              size={Constant.ICON_SIZE}
              x={
                index * Constant.TAB_BAR_WIDTH +
                Constant.ICON_SIZE +
                Constant.MARGIN
              }
              width={Constant.TAB_BAR_WIDTH}
            />
          );
        })}
      </Canvas>
    </GestureDetector>
  );
};
