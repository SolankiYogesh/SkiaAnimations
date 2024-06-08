import {StyleProp, View, ViewStyle} from 'react-native';
import React from 'react';
import {CommonStyle} from '@/Helpers';
import {useTheme} from 'react-native-paper';
interface AppContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}
const AppContainer = ({children, style}: AppContainerProps) => {
  const {colors} = useTheme();
  return (
    <View
      style={[
        CommonStyle.flex,
        {
          backgroundColor: colors.background,
        },
        style,
      ]}>
      {children}
    </View>
  );
};

export default AppContainer;
