import React, {useRef} from 'react'
import {Button, View} from 'react-native'

import TopSheet, {TopSheetRef} from './Components/TopSheet'
import {AppContainer, CommentItem} from '@/Components'
import CommentData from '@/data/CommentData'
import {CommonStyle} from '@/Helpers'

const TopSheetWithGuard = () => {
  const sheetRef = useRef<TopSheetRef>(null)
  return (
    <AppContainer>
      <TopSheet ref={sheetRef}>
        <CommentItem item={CommentData[0]} />
      </TopSheet>

      <View style={CommonStyle.centerFlex}>
        <Button title={'Open'} onPress={() => sheetRef.current?.toggle()} />
      </View>
    </AppContainer>
  )
}

export default TopSheetWithGuard
