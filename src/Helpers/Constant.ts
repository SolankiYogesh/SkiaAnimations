import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const HEIGHT = 60;
const ICON_SIZE = HEIGHT / 2;
const MARGIN = 10;
const WIDTH = width - MARGIN * 2;
const TAB_BAR_WIDTH = WIDTH / 4;

export default {
  HEIGHT,
  ICON_SIZE,
  MARGIN,
  WIDTH,
  TAB_BAR_WIDTH,
};
