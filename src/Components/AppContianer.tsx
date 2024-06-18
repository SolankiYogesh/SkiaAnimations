import {StyleProp, View, ViewStyle} from 'react-native';
import React from 'react';
import {CommonStyle} from '@/Helpers';

interface AppContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}
const AppContainer = ({children, style}: AppContainerProps) => {
  return <View style={[CommonStyle.flex, style]}>{children}</View>;
};

export default AppContainer;
