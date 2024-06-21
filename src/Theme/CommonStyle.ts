import {StyleSheet} from 'react-native'

import {Colors} from '@/Helpers'

export default StyleSheet.create({
  centerFlex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.transparent
  },
  flex: {
    flex: 1,
    backgroundColor: Colors.transparent
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})
