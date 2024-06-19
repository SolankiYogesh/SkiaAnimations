import {Dimensions} from 'react-native'

const {width: WINDOW_WIDTH, height: WINDOW_HEIGHT} = Dimensions.get('window')
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('screen')

const widthPx = (widthPercent: number) => {
  const elemWidth = typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent)
  return (WINDOW_WIDTH * elemWidth) / 100
}

const heightPx = (heightPercent: number) => {
  const elemHeight = typeof heightPercent === 'number' ? heightPercent : parseFloat(heightPercent)
  return (WINDOW_HEIGHT * elemHeight) / 100
}
export {heightPx, SCREEN_HEIGHT, SCREEN_WIDTH, widthPx, WINDOW_HEIGHT, WINDOW_WIDTH}
