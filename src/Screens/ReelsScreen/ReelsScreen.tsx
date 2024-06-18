import {Platform, StatusBar} from 'react-native';
import React, {useMemo, useRef} from 'react';
import {Colors} from '@/Helpers';
import VideoItem from './Components/VideoItem';
import {useHeaderHeight} from '@react-navigation/elements';
import data, {TVideoItem} from '@/data/VideoData';

import AppContainer from '@/Components/AppContianer';
import {ViewabilityTrackerFlashList} from './Components/ViewabilityTrackerFlashList';

import {FlashList} from '@shopify/flash-list';
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Constant from '@/Helpers/Constant';

const ReelsScreen = () => {
  const ref = useRef<FlashList<TVideoItem>>(null);
  const height = useHeaderHeight();
  const frame = useSafeAreaFrame();
  const {bottom} = useSafeAreaInsets();
  console.log('bottom', Platform.OS, Constant.HEIGHT + (bottom || 34));

  const currentHeight = useMemo(() => frame.height - height, [height, frame]);

  return (
    <AppContainer>
      <StatusBar translucent backgroundColor={Colors.transparent} />

      <ViewabilityTrackerFlashList
        ref={ref}
        data={data}
        keyExtractor={item => item.url}
        renderItem={({item}) => (
          <VideoItem
            height={currentHeight}
            bottom={Constant.HEIGHT + 10 + (bottom || 34)}
            url={item.url}
          />
        )}
        drawDistance={currentHeight}
        estimatedItemSize={currentHeight}
        disableIntervalMomentum={true}
        decelerationRate={'fast'}
        showsVerticalScrollIndicator={false}
        pagingEnabled
      />
    </AppContainer>
  );
};

export default ReelsScreen;
