import React from 'react'
import {FlashList} from '@shopify/flash-list'

import {AppContainer, CommentItem} from '@/Components'
import CommentData from '@/data/CommentData'

export default () => {
  return (
    <AppContainer>
      <FlashList
        data={CommentData}
        estimatedItemSize={300}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => <CommentItem item={item} />}
      />
    </AppContainer>
  )
}
