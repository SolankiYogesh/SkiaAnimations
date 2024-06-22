import React, {useCallback, useMemo, useRef, useState} from 'react'
import {useSafeAreaFrame, useSafeAreaInsets} from 'react-native-safe-area-context'
import {useHeaderHeight} from '@react-navigation/elements'
import {FlashList} from '@shopify/flash-list'
import _ from 'lodash'

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
  const [videoData, setVideoData] = useState<VideoType[]>(VideoData)

  const currentHeight = useMemo(() => frame.height - height, [height, frame])

  const onEnd = useCallback(() => {
    setVideoData((state) => {
      const clone = _.map(VideoData, (i, index) => ({...i, id: state.length + index + 1}))
      return [...state, ...clone]
    })
  }, [])

  return (
    <AppContainer>
      <ViewabilityTrackerFlashList
        ref={ref}
        data={videoData}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <VideoItem
            height={currentHeight}
            bottom={Constant.HEIGHT + 10 + (bottom || 34)}
            url={item.url}
          />
        )}
        onEndReached={onEnd}
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
