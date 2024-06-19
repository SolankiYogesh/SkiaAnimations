import React, {useMemo, useRef} from 'react'
import {StatusBar} from 'react-native'
import {useSafeAreaFrame, useSafeAreaInsets} from 'react-native-safe-area-context'
import {useHeaderHeight} from '@react-navigation/elements'
import {FlashList} from '@shopify/flash-list'

import VideoItem from './Components/VideoItem'
import {ViewabilityTrackerFlashList} from './Components/ViewabilityTrackerFlashList'
import AppContainer from '@/Components/AppContianer'
import data, {TVideoItem} from '@/data/VideoData'
import {Colors} from '@/Helpers'
import Constant from '@/Helpers/Constant'

export default () => {
  const ref = useRef<FlashList<TVideoItem>>(null)
  const height = useHeaderHeight()
  const frame = useSafeAreaFrame()
  const {bottom} = useSafeAreaInsets()

  const currentHeight = useMemo(() => frame.height - height, [height, frame])

  return (
    <AppContainer>
      <StatusBar translucent backgroundColor={Colors.transparent} />

      <ViewabilityTrackerFlashList
        ref={ref}
        data={data}
        keyExtractor={(item) => item.url}
        renderItem={({item}) => (
          <VideoItem
            height={currentHeight}
            bottom={Constant.HEIGHT + 10 + (bottom || 34)}
            url={item.url}
          />
        )}
        drawDistance={currentHeight}
        estimatedItemSize={currentHeight}
        disableIntervalMomentum
        decelerationRate={'fast'}
        showsVerticalScrollIndicator={false}
        pagingEnabled
      />
    </AppContainer>
  )
}
