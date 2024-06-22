import React, {useMemo, useRef} from 'react'
import {useSafeAreaFrame, useSafeAreaInsets} from 'react-native-safe-area-context'
import {useHeaderHeight} from '@react-navigation/elements'
import {FlashList} from '@shopify/flash-list'

import VideoItem from './Components/VideoItem'
import {ViewabilityTrackerFlashList} from './Components/ViewabilityTrackerFlashList'
import AppContainer from '@/Components/AppContainer'
import VideoData from '@/data/VideoData'
import Constant from '@/Helpers/Constant'

export default () => {
  const ref = useRef<FlashList<VideoType>>(null)
  const height = useHeaderHeight()
  const frame = useSafeAreaFrame()
  const {bottom} = useSafeAreaInsets()

  const currentHeight = useMemo(() => frame.height - height, [height, frame])

  return (
    <AppContainer>
      <ViewabilityTrackerFlashList
        ref={ref}
        data={VideoData}
        keyExtractor={(item) => item.id}
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
