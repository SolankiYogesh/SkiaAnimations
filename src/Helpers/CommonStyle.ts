import {StyleSheet} from 'react-native'

import Colors from './Colors'
import {SCREEN_HEIGHT, SCREEN_WIDTH} from './Measurements'

const CommonStyle = StyleSheet.create({
  flex: {
    flex: 1
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  centerFlex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  shadow: {
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  screen: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  absolute: {
    position: 'absolute'
  }
})
export default CommonStyle
